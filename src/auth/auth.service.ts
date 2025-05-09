import {Injectable, UnauthorizedException} from '@nestjs/common';
import * as argon2 from 'argon2';
import { UsersRepo } from 'domain/repos/users.repo';
import { SignUpBodyDto } from './dtos/sign-up.dto';
import { SignInBodyDto } from './dtos/sign-in.dto';
import { SecurityService } from 'libs/security/security.service';
import { JwtPayload } from 'libs/security/types/jwt.types';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersRepo: UsersRepo,
    private securityService: SecurityService,
    private jwtService: JwtService,
  ) {}

  public async signIn(signInForm: SignInBodyDto) {
    const { email, password } = signInForm;
    const user = await this.usersRepo.getUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User does not exist')
    }
    const passwordMatch = await argon2.verify(user.hashedPassword, password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Wrong password');
    }
    const payload: JwtPayload = { id: user.id, email: user.email };
    return this.assignTokens(payload);
  }

  async signUp(signUpForm: SignUpBodyDto) {
    const { email, password, confirmPassword } = signUpForm;
    const user = await this.usersRepo.getUserByEmail(email);
    if (user) {
      throw new UnauthorizedException('User with this email already exists');
    }
    if (password !== confirmPassword) {
      throw new UnauthorizedException('Passwords do not match');
    }
    const hashedPassword = await argon2.hash(password);
    const createdUser = await this.usersRepo.createUser(email, hashedPassword);
    const payload = { id: createdUser.id, email: createdUser.email };
    return this.assignTokens(payload);
  }

  async signOut(bearer: string) {
    const access_token = bearer.replace('Bearer ', '');
    const userFromToken = await this.jwtService.verifyAsync(access_token, {
      secret: process.env.JWT_SECRET,
    });
    return await this.usersRepo.signOutUser(userFromToken);
  }

  async refresh(bearer: string) {
    const refresh_token = bearer.replace('Bearer ', '');
    const user = await this.usersRepo.findByRefreshToken(refresh_token);

    if (!user) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
    };
    return await this.assignTokens(payload);
  }

  async assignTokens(payload: JwtPayload) {
    const tokens = await this.securityService.generateTokens(payload);
    await this.usersRepo.setRefreshToken(payload.id, tokens.refresh_token);
    return tokens;
  }
}
