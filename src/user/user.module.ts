import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UsersRepo } from 'domain/repos/users.repo';
import {DbModule} from '../db/db.module';
import {JwtModule} from '@nestjs/jwt';
import {ConfigModule, ConfigService} from '@nestjs/config';

@Module({
  imports: [DbModule,
    JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get<string>('JWT_SECRET'),
      signOptions: {
        expiresIn: '1d',
      },
    }),
  }),],
  controllers: [UserController],
  providers: [UserService, UsersRepo],
})
export class UserModule {}
