import { IsEmail, IsString } from 'class-validator'

export class SignInForm {
  @IsEmail()
  email: string

  @IsString()
  password: string
}