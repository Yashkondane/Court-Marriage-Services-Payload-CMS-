import type { CollectionAfterChangeHook } from 'payload'
import { createClient } from '@supabase/supabase-js'

/**
 * Syncs Payload CMS user data to Supabase Auth.
 * On user create → creates a Supabase Auth user
 * On user update → updates Supabase Auth user metadata
 */
export const syncSupabaseAuth: CollectionAfterChangeHook = async ({
  doc,
  operation,
  req,
}) => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    req.payload.logger.warn('Supabase credentials not configured — skipping auth sync')
    return doc
  }

  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })

  try {
    if (operation === 'create') {
      const { data, error } = await supabaseAdmin.auth.admin.createUser({
        email: doc.email,
        email_confirm: true,
        user_metadata: {
          name: doc.name,
          role: doc.role,
          payloadId: doc.id,
        },
      })

      if (error) {
        req.payload.logger.error(`Failed to sync user to Supabase: ${error.message}`)
      } else if (data?.user) {
        // Update the Payload user with the Supabase ID
        await req.payload.update({
          collection: 'users',
          id: doc.id,
          data: { supabaseId: data.user.id },
          depth: 0,
        })
      }
    } else if (operation === 'update' && doc.supabaseId) {
      const { error } = await supabaseAdmin.auth.admin.updateUserById(doc.supabaseId, {
        email: doc.email,
        user_metadata: {
          name: doc.name,
          role: doc.role,
          payloadId: doc.id,
        },
      })

      if (error) {
        req.payload.logger.error(`Failed to update Supabase user: ${error.message}`)
      }
    }
  } catch (err) {
    req.payload.logger.error(`Supabase sync error: ${err}`)
  }

  return doc
}
