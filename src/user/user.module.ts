import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UsersRepo } from 'domain/repos/users.repo';

@Module({
  controllers: [UserController],
  providers: [UserService, UsersRepo],
})
export class UserModule {}
