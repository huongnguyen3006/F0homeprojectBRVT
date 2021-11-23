import { applyDecorators } from '@nestjs/common';
import { Permission } from 'src/permissions/permission.enum';
import { RequirePermissions } from 'src/permissions/require-permissions.decorator';

export function Admin() {
  return applyDecorators(RequirePermissions(Permission.ADMIN));
}
