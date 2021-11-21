import { UserRole } from 'src/user/user.entity';
import { Permission } from './permission.enum';

const adminPermissions = [Permission.ADMIN];

const volunteerPermissions = [
  Permission.ADD_F0S,
  Permission.CREATE_EXAM,
  Permission.CREATE_TEST_RESULT,
];

const doctorPermissions = [];

type RolePermissions = { [role in UserRole]: Permission[] };
const rolePermissions: RolePermissions = {
  admin: adminPermissions,
  volunteer: volunteerPermissions,
  doctor: doctorPermissions,
};

export function getRolePermissions(role: UserRole): Permission[] {
  const permissions = rolePermissions[role];
  return permissions ?? [];
}
