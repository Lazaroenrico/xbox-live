import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty({
    example: 'Lázaro',
  })
  Name: string;

  @IsString()
  @ApiProperty({
    example: 'georginho123@gmail.com',
  })
  Email: string;

  @IsString()
  @ApiProperty({
    example: '12789123456',
  })
  CPF: string;

  @IsBoolean()
  @ApiProperty({
    example: false,
  })
  Admin: boolean;
}
