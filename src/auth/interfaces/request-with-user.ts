import { Request } from 'express';
import { User } from 'src/user/user.entity';

export default interface RequestWithUser extends Request {
  user: User;
}
