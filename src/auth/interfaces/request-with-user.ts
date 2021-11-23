import { Request } from 'express';
import { UserPayload } from './user-payload';

export interface RequestWithUser extends Request {
  user: UserPayload;
}
