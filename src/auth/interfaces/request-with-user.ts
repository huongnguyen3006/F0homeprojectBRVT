import { Request } from 'express';
import { User } from 'src/user/user.entity';
import { JwtPayload } from './jwt-payload';

export default interface RequestWithUser extends Request {
  user: JwtPayload;
}
