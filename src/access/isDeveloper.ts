import type { Access } from 'payload'
import { ROLES } from './roles'

export const isDeveloper: Access = ({ req: { user } }) => {
  if (!user) return false
  return user.role === ROLES.DEVELOPER
}
