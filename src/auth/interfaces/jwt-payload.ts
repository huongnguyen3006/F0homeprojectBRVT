import { UserRole } from 'src/user/user.entity';

export interface JwtPayload {
  id: number;
  email: string;
  role: UserRole;
  doctorId?: number;
  volunteerId?: number;
}
