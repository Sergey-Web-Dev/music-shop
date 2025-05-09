import {
  Controller,
  Post,
  Body,
  Headers,
  UnauthorizedException,
  InternalServerErrorException,
  Res,
  BadRequestException, Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {SignInBodyDto, } from './dtos/sign-in.dto';
import {
  ApiBadRequestResponse,
  ApiBody, ApiCreatedResponse,
  ApiInternalServerErrorResponse, ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Response } from 'express';
import {SignUpBodyDto} from './dtos/sign-up.dto';
import {getSessionInfoDto} from './dtos/session-info.dto';
import {SessionInfo} from '../libs/decorators/session-info.decorator';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService){}

  @ApiOperation({
    summary:
      'Log in user into the system, if successful, the tokens will be set in the cookie',
  })
  @ApiResponse({
    status: 201,
    description: 'User successfully signed in',
  })
  @ApiBody({
    description: `User's credentials`,
    type: SignInBodyDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized access',
    type: UnauthorizedException,
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorException,
  })
  @ApiCreatedResponse({
    type: SignInBodyDto,
  })
  @Post('sign-in')
  async signIn(@Body() body: SignInBodyDto,
               @Res({ passthrough: true }) res: Response) {
    const {refresh_token, access_token}  = await this.authService.signIn(
      body
    );

    res.cookie('accessToken', access_token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
    });

    res.cookie('refreshToken', refresh_token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
    });
  }

  @ApiOperation({
    summary: 'User registration',
  })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered',
    type: SignUpBodyDto,
  })
  @ApiBody({
    description: 'User body for registration',
    type: SignUpBodyDto,
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorException,
  })
  @ApiBadRequestResponse({
    type: BadRequestException,
  })
  @Post('sign-up')
  async signUp(@Body() body: SignUpBodyDto, @Res({ passthrough: true }) res: Response) {
    const {refresh_token, access_token}  = await this.authService.signUp(
      body
    );

    res.cookie('accessToken', access_token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
    });

    res.cookie('refreshToken', refresh_token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
    });
  }

  @ApiOperation({
    summary: 'Log out user',
  })
  @ApiResponse({
    status: 201,
    description:
      'User successfully logged out, the tokens will be cleared from cookie',
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorException,
  })
  @ApiBadRequestResponse({
    type: BadRequestException,
  })
  @Post('sign-out')
  async signOut(@Headers('Authorization') bearer: string, @Res({ passthrough: true }) res: Response) {
    const resOut = await this.authService.signOut(bearer)
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return resOut;
  }

  @Post('/refresh')
  async refresh(@Body('refreshToken') bearer: string) {
    return this.authService.refresh(bearer);
  }

  @ApiOperation({
    summary: 'Get user information',
  })
  @ApiResponse({
    status: 201,
    description: 'User info successfully required',
    type: getSessionInfoDto,
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorException,
  })
  @ApiBadRequestResponse({
    type: BadRequestException,
  })
  @Get('session-info')
  // @UseGuards(AuthGuard)
  @ApiOkResponse({
    type: getSessionInfoDto,
  })
  getSessionInfo(@SessionInfo() session: getSessionInfoDto) {
    return session;
  }
}