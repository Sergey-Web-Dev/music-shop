import { IsEmail, IsString } from 'class-validator'

export class SignUpForm {
  @IsEmail()
  email: string

  @IsString()
  password: string

  @IsString()
  confirmPassword: string
}