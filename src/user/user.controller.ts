import {
  BadRequestException, Body,
  Controller,
  Get,
  InternalServerErrorException, Post, Query, Patch,
  UnauthorizedException, UseInterceptors, UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiBadRequestResponse, ApiBody, ApiConsumes,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiTags, ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {UserInfoResponseDto} from './dtos/user-info.response.dto';
import {SessionInfo} from '../libs/decorators/session-info.decorator';
import {getSessionInfoDto} from '../auth/dtos/session-info.dto';
import {GetUserListRequestDto} from './dtos/user-list.request.dto';
import {ForgotPasswordRequestDto} from './dtos/forgot-password.dto';
import {ResetPasswordRequestDto} from './dtos/reset-password.dto';
import {ChangePasswordRequestDto} from './dtos/change-password.dto';
import {FileInterceptor} from '@nestjs/platform-express';
import {diskStorage} from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import {updateUserDto} from './dtos/update-user-profile.dto';
import {User} from '@prisma/client';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Get user profile info',
  })
  @ApiResponse({
    status: 200,
    description: 'User profile info',
    type: UserInfoResponseDto,
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorException,
  })
  @ApiBadRequestResponse({
    type: BadRequestException,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized user',
    type: UnauthorizedException,
  })
  // @Roles([ROLES.OWNER, ROLES.USER])
  // @UseGuards(JwtGuard, RolesGuard)
  @Get('user-profile')
  async getUserProfile(
    @SessionInfo() session: getSessionInfoDto,
  ): Promise<User> {
    return this.userService.getUserProfile({ email: session.email });
  }

  @ApiOperation({
    summary: 'List of users for Admin',
  })
  @ApiResponse({
    status: 200,
    description: 'List of users',
    type: [UserInfoResponseDto],
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorException,
  })
  @ApiBadRequestResponse({
    type: BadRequestException,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized user',
    type: UnauthorizedException,
  })
  // @Roles([ROLES.OWNER])
  // @UseGuards(JwtGuard, RolesGuard)
  @Get('all-users')
  async getListOfUsers(
    @Query() queryOptions: GetUserListRequestDto,
  ): Promise<User[]> {
    return this.userService.findAndSort(queryOptions);
  }

  @ApiOperation({
    summary: 'Get user role',
  })
  @ApiResponse({
    status: 200,
    description: 'User Role',
    type: String,
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorException,
  })
  @ApiBadRequestResponse({
    type: BadRequestException,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized user',
    type: UnauthorizedException,
  })
  // @Roles([ROLES.OWNER, ROLES.USER])
  // @UseGuards(JwtGuard, RolesGuard)
  @Get('user-role')
  async getUserRole(@SessionInfo() session: getSessionInfoDto,): Promise<string> {
    return await this.userService.getUserRole({ userId: session.id });
  }

  @ApiOperation({
    summary: 'Forgot password endpoint',
  })
  @ApiBody({
    description: `User's email to reset password`,
    type: ForgotPasswordRequestDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Sending email to user',
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorException,
  })
  @ApiBadRequestResponse({
    type: BadRequestException,
  })
  @Post('forgot-password')
  async forgotPassword(@Body() { email }: ForgotPasswordRequestDto) {
    return await this.userService.forgotPassword({ email });
  }

  @ApiOperation({
    summary: 'Reset password endpoint after forgot password',
  })
  @ApiBody({
    description: `User's info to reset password`,
    type: ResetPasswordRequestDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Reset password',
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorException,
  })
  @ApiBadRequestResponse({
    type: BadRequestException,
  })
  @Post('reset-password')
  async resetPassword(
    @Body()
    { email, newPassword, repeatPassword }: ResetPasswordRequestDto,
  ) {
    return await this.userService.resetPassword({
      email,
      newPassword,
      repeatPassword,
    });
  }

  @ApiOperation({
    summary: 'Change password endpoint',
  })
  @ApiBody({
    description: `User's info to change password`,
    type: ChangePasswordRequestDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Change password',
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorException,
  })
  @ApiBadRequestResponse({
    type: BadRequestException,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized user',
    type: UnauthorizedException,
  })
  // @Roles([ROLES.USER, ROLES.OWNER])
  // @UseGuards(JwtGuard, RolesGuard)
  @Patch('change-password')
  async changePassword(
    @SessionInfo() session: getSessionInfoDto,
    @Body() { oldPassword, newPassword, repeatOldPassword }: ChangePasswordRequestDto,
  ) {
    return this.userService.changePassword({
      id: session.id,
      oldPassword,
      newPassword,
      repeatOldPassword,
    });
  }

  @ApiOperation({
    summary: 'Edit profile',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: `User's info to edit profile`,
    type: updateUserDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Edit profile',
    type: updateUserDto,
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorException,
  })
  @ApiBadRequestResponse({
    type: BadRequestException,
  })
  @ApiUnauthorizedResponse({
  description: 'Unauthorized user',
    type: UnauthorizedException,
  })
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 5 * 1024 * 1024 },
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = `${uuidv4()}${extname(file.originalname)}`;
          cb(null, uniqueSuffix);
        },
      }),
    })
  )
  // @Roles([ROLES.USER])
  // @UseGuards(JwtGuard, RolesGuard)
  @Patch('edit-profile')
  async editProfile(
    @SessionInfo() session: getSessionInfoDto,
    @Body() updateUserDto: updateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ){
    return this.userService.update(session.id, updateUserDto, file);
  }
}
