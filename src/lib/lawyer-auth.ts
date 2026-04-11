import { NextRequest } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

/**
 * Verifies the Supabase JWT from the Authorization header 
 * and returns the corresponding Lawyer profile from Payload.
 */
export async function getLawyerFromToken(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return { error: 'Missing or invalid authorization header.', status: 401 }
  }

  const token = authHeader.split(' ')[1]
  const supabase = createAdminClient()

  const { data: { user }, error } = await supabase.auth.getUser(token)
  if (error || !user) {
    return { error: 'Invalid or expired session. Please login again.', status: 401 }
  }

  const payload = await getPayload({ config: configPromise })
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result = await (payload.find as any)({
    collection: 'lawyers',
    where: { supabaseId: { equals: user.id } },
    limit: 1,
    depth: 2,
  })

  if (result.docs.length === 0) {
    return { error: 'No lawyer profile found.', status: 404 }
  }

  return { lawyer: result.docs[0], user, supabaseUser: user }
}
