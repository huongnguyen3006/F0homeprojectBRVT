import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload';
import RequestWithUser from 'src/auth/interfaces/request-with-user';
import { IS_PUBLIC_KEY } from 'src/common/decorators/public.decorator';
import { Permission } from './permission.enum';
import { REQUIRE_PERMISSIONS_KEY } from './require-permissions.decorator';
import { getRolePermissions } from './role.permissions';

/* To restrict permission on controller or route, put these decorators 

@RequirePermissions(Permission.ADMIN)

or 

@RequirePermissions(Permission.PERMISSION_A, Permission.PERMISSION_B)
(This would require both permissions to allow access)

*/

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(
      REQUIRE_PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredPermissions) return true;

    const { user }: RequestWithUser = context.switchToHttp().getRequest();
    if (!user) return false;

    const { role } = user;
    const permissions: Permission[] = getRolePermissions(role);

    if (permissions.includes(Permission.ADMIN)) return true;

    return requiredPermissions.every((requiredPermission) =>
      permissions.includes(requiredPermission),
    );
  }
}
