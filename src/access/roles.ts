export const ROLES = {
  DEVELOPER: 'developer',
  ADMIN: 'admin',
  BLOG_MANAGER: 'blogManager',
} as const

export type Role = (typeof ROLES)[keyof typeof ROLES]

export const ROLE_OPTIONS = [
  { label: 'Developer (Super Admin)', value: ROLES.DEVELOPER },
  { label: 'Admin', value: ROLES.ADMIN },
  { label: 'Blog Manager', value: ROLES.BLOG_MANAGER },
]
