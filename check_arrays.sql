-- Check sequences for block array tables
SELECT 
    table_name,
    column_name,
    data_type
FROM information_schema.columns
WHERE table_name LIKE 'pages_blocks_%_items'
AND column_name = 'id';

-- Check if any id sequence is out of sync for these block item tables specifically
DO $$
DECLARE
    r RECORD;
    max_id BIGINT;
BEGIN
    FOR r IN
        SELECT c.oid::regclass AS tbl,
               pg_get_serial_sequence(c.oid::regclass::text, a.attname) AS seq
        FROM pg_class c
        JOIN pg_attribute a ON a.attrelid = c.oid
        JOIN pg_namespace n ON n.oid = c.relnamespace
        WHERE n.nspname = 'public'
          AND c.relkind = 'r'
          AND c.relname LIKE 'pages_blocks_%_items'
          AND a.attname = 'id'
          AND pg_get_serial_sequence(c.oid::regclass::text, a.attname) IS NOT NULL
    LOOP
        EXECUTE format('SELECT COALESCE(MAX(id), 0) FROM %s', r.tbl) INTO max_id;
        RAISE NOTICE 'Table % max_id = %, sequence = %', r.tbl, max_id, r.seq;
        IF max_id > 0 THEN
            EXECUTE format('SELECT setval(%L, %s)', r.seq, max_id + 100);
            RAISE NOTICE 'Forced reset to %', max_id + 100;
        END IF;
    END LOOP;
END
$$;
