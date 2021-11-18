import { Request } from 'express';

export default function tokenExtractor(req: Request) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  )
    return req.headers.authorization.split(' ')[1];
  return null;
}
