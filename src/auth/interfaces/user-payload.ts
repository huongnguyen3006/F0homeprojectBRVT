import { UserRole } from 'src/user/user.entity';

export interface UserPayload {
  userId: number;
  email: string;
  role: UserRole;
  doctorId?: number;
  volunteerId?: number;
}
