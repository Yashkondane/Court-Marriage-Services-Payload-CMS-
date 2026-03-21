import type { Access } from 'payload'
import { ROLES } from './roles'

export const isBlogManager: Access = ({ req: { user } }) => {
  if (!user) return false
  return (
    user.role === ROLES.DEVELOPER ||
    user.role === ROLES.ADMIN ||
    user.role === ROLES.BLOG_MANAGER
  )
}
