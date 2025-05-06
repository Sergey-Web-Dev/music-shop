import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersRepo } from 'domain/repos/users.repo';
import { SecurityService } from 'libs/security/security.service';
import { SecurityModule } from 'libs/security/security.module';
import {DbModule} from '../db/db.module';


@Module({
  imports: [SecurityModule, DbModule],
  controllers: [AuthController],
  providers: [AuthService, UsersRepo, SecurityService],
})
export class AuthModule {}
