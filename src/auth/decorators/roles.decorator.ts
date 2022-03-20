import { SetMetadata } from '@nestjs/common'

import { Role } from '../models/role.model'

export const ROLES_KEY = 'roles'

export const hasRoles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles)
