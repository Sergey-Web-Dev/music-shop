import { ApiProperty } from '@nestjs/swagger';

export class getSessionInfoDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;
}