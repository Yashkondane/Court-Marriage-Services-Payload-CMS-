/**
 * Convenience wrapper around Payload's getPayload so pages can call
 * `getPayload()` with no arguments instead of importing configPromise every time.
 */
import { getPayload as _getPayload } from 'payload'
import configPromise from '@/payload.config'

export async function getPayload() {
  return _getPayload({ config: configPromise })
}
