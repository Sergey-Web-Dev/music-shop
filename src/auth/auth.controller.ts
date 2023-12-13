import { Controller, Post, Body, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpForm } from './domain/sign-up.form';
import { SignInForm } from './domain/sign-in.form';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService){}

  @Post('/sign-in')
  async signIn(@Body() signInForm: SignInForm) {
    return await this.authService.signIn(signInForm)
  }

  @Post('/sign-up')
  async signUp(@Body() signUpForm: SignUpForm) {
    return await this.authService.signUp(signUpForm);
  }

  @Post('/sign-out')
  async signOut(@Headers('Authorization') bearer: string) {
    return this.authService.signOut(bearer);
  }

  @Post('/refresh')
  async refresh(@Headers('Authorization') bearer: string) {
    return this.authService.refresh(bearer);
  }
}
