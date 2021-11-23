import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestWithUser } from 'src/auth/interfaces/request-with-user';

export const RequestUser = createParamDecorator(
  (property: string, ctx: ExecutionContext) => {
    const request: RequestWithUser = ctx.switchToHttp().getRequest();
    const { user } = request;

    return property ? user?.[property] : user;
  },
);
