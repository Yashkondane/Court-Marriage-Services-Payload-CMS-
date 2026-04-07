-- =============================================================================
-- Comprehensive fix for 400 "Value must be unique: id" on pages collection
-- This fixes sequence conflicts in ALL pages-related tables
-- =============================================================================

-- Step 1: Clean ALL version tables
DELETE FROM _pages_v;

-- Step 2: Reset sequences on ALL pages-related tables to avoid ID conflicts
-- This ensures the next auto-increment ID is higher than any existing row
DO $$
DECLARE
    r RECORD;
    max_id BIGINT;
BEGIN
    FOR r IN
        SELECT c.oid::regclass AS tbl,
               a.attname AS col,
               pg_get_serial_sequence(c.oid::regclass::text, a.attname) AS seq
        FROM pg_class c
        JOIN pg_attribute a ON a.attrelid = c.oid
        JOIN pg_namespace n ON n.oid = c.relnamespace
        WHERE n.nspname = 'public'
          AND c.relkind = 'r'
          AND (c.relname LIKE 'pages%' OR c.relname LIKE '_pages%')
          AND a.attname = 'id'
          AND pg_get_serial_sequence(c.oid::regclass::text, a.attname) IS NOT NULL
    LOOP
        EXECUTE format('SELECT COALESCE(MAX(id), 0) FROM %s', r.tbl) INTO max_id;
        IF max_id > 0 THEN
            EXECUTE format('SELECT setval(%L, %s)', r.seq, max_id);
            RAISE NOTICE 'Reset sequence % to % for table %', r.seq, max_id, r.tbl;
        END IF;
    END LOOP;
END
$$;
