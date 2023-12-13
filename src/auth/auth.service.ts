import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { UsersRepo } from 'domain/repos/users.repo';
import { SignUpForm } from './domain/sign-up.form';
import { SignInForm } from './domain/sign-in.form';
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

  async signIn(signInForm: SignInForm) {
    const { email, password } = signInForm;
    const user = await this.usersRepo.getUserByEmail(email);
    if(!user) {
      throw new HttpException('There is no such user', HttpStatus.BAD_REQUEST);
    }
    const passwordMatch = await argon2.verify(user.hashedPassword, password)
    if(!passwordMatch) {
      throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST);
    }
    const payload: JwtPayload = { sub: user.id, email: user.email };
    return this.assignTokens(payload);
  }

  async signUp(signUpForm: SignUpForm) {
    const { email, password, confirmPassword } = signUpForm;
    const entity = await this.usersRepo.getUserByEmail(email);
    if(entity) {
      throw new HttpException('User with this email already exists', HttpStatus.BAD_REQUEST);
    }
    if(password !== confirmPassword) {
      throw new HttpException('Passwords do not match', HttpStatus.BAD_REQUEST);
    }
    const hashedPassword = await argon2.hash(password)
    const createdUser = await this.usersRepo.createUser(email, hashedPassword);
    const payload = {sub: createdUser.id, email: createdUser.email};
    return this.assignTokens(payload)
  }

  async signOut(bearer: string) {
    const access_token = bearer.replace('Bearer ', '')
    const userFromToken = await this.jwtService.verifyAsync(access_token, {
      secret: process.env.JWT_SECRET
    })
    return await this.usersRepo.signOutUser(userFromToken);
  }

  async assignTokens(payload: JwtPayload) {
    const tokens = await this.securityService.generateTokens(payload);
    await this.usersRepo.setRefreshToken(payload.sub, tokens.refresh_token);
    return tokens;
  }
}
