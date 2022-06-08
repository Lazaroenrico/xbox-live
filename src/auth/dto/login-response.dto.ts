import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';

export class LoginResponseDto {
  @ApiProperty({
    description: 'JWT gerado pelo login',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6Imdlb3JnaW5obzEyM0BnbWFpbC5jb20iLCJpYXQiOjE2NTQ2ODQxMTMsImV4cCI6MTY1NDk0MzMxM30.HbkyWphHQqjhPidX7fUalWwBOGx-1VFkh_rTYfqSEsk',
  })
  token: string;

  @ApiProperty({
    description: 'Dados do usuário autenticado',
  })
  user: User;
}
