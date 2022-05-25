import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty({
    description:"Nome do usuário",
    example: 'Lázaro',
  })
  Name: string;

  @IsString()
  @ApiProperty({
    description:"Email do usuário",
    example: 'georginho123@gmail.com',
  })
  Email: string;

  @IsString()
  @ApiProperty({
    description:"CPF do usuário",
    example: '12789123456',
  })
  CPF: string;

  @IsBoolean()
  @ApiProperty({
    description:"Admin do usuário",
    example: false,
  })
  Admin: boolean;
}
