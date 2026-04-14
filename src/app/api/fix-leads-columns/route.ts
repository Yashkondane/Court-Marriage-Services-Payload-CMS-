import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'

/**
 * ONE-TIME migration endpoint.
 * Renames columns in the "leads" table from old names to Payload 3 standard names.
 * 
 * Old DB columns: service, location, lawyer
 * Payload 3 expects: service_id, location_id, lawyer_id
 * 
 * Visit: /api/fix-leads-columns  (GET request)
 * Delete this file after running once.
 */
export async function GET(req: NextRequest) {
  // Simple secret check to prevent accidental/unauthorized runs
  const secret = req.nextUrl.searchParams.get('secret')
  if (secret !== 'fix-leads-2026') {
    return NextResponse.json({ error: 'Add ?secret=fix-leads-2026 to the URL' }, { status: 403 })
  }

  try {
    const payload = await getPayload({ config: configPromise })
    const db = (payload.db as any)
    
    const results: Array<{ query: string; status: string; error?: string }> = []

    // Step 1: Check what columns currently exist
    const colCheck = await db.drizzle.execute(
      `SELECT column_name FROM information_schema.columns WHERE table_name = 'leads' ORDER BY ordinal_position;`
    )
    const existingColumns = colCheck.rows.map((r: any) => r.column_name)
    
    results.push({ query: 'Column check', status: 'info', error: JSON.stringify(existingColumns) })

    // Step 2: Rename columns that exist with old names
    const renames = [
      { from: 'service', to: 'service_id' },
      { from: 'location', to: 'location_id' },
      { from: 'lawyer', to: 'lawyer_id' },
    ]

    for (const r of renames) {
      if (existingColumns.includes(r.from) && !existingColumns.includes(r.to)) {
        try {
          await db.drizzle.execute(`ALTER TABLE "leads" RENAME COLUMN "${r.from}" TO "${r.to}";`)
          results.push({ query: `${r.from} → ${r.to}`, status: 'success' })
        } catch (e: any) {
          results.push({ query: `${r.from} → ${r.to}`, status: 'failed', error: e?.message })
        }
      } else if (existingColumns.includes(r.to)) {
        results.push({ query: `${r.from} → ${r.to}`, status: 'skipped (already exists)' })
      } else {
        results.push({ query: `${r.from} → ${r.to}`, status: 'skipped (source column not found)' })
      }
    }

    return NextResponse.json({ success: true, results })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message }, { status: 500 })
  }
}
