import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const SessionInfo = createParamDecorator(
  (_, ctx: ExecutionContext) => ctx.switchToHttp().getRequest().session,
);