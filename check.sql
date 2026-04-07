-- 1. Check if ID 2 exists in pages
SELECT id, slug, status FROM pages WHERE id = 2;

-- 2. Check how many pages have ID 2
SELECT id, COUNT(*) FROM pages GROUP BY id HAVING COUNT(*) > 1;

-- 3. Check what tables have a conflict
SELECT setval('pages_id_seq', (SELECT MAX(id) FROM pages));
