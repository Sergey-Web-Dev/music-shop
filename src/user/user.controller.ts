import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CurrentUser } from 'libs/decorators/current-user.decorator';
import { UserDto } from 'domain/dto/user.dto';
import { JwtGuard } from 'libs/security/guards/jwt.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('get-me')
  @UseGuards(JwtGuard)
  async getCurrentUser(@CurrentUser('id') userId: string) {
    const user = await this.userService.getUserById(userId);
    return UserDto.fromEntity(user)
  }
}
