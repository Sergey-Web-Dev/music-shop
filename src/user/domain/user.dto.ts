import { IsOptional, IsString } from "class-validator";

export class UserDto {
  @IsString()
  email: string
  
  @IsOptional()
  firstName?: string

  @IsOptional()
  lastName?: string

  @IsOptional()
  refresh_token?: string

}