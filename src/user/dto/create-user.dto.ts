import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, Matches, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty({
    description: 'Nome do usuário. Dever ser único para se utilizar no login',
    example: 'Lázaro',
  })
  Name: string;

  @IsString()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Senha muito fraca',
  })
  @ApiProperty({
    description: 'Senha do usuário para login',
    example: 'Naoseias2senhas!',
  })
  Password: string;

  @ApiProperty({
    description: 'A confirmação de senha deve ser igual a senha.',
    example: 'Naoseias2senhas!',
  })
  confirmPassword: string;

  @IsString()
  @ApiProperty({
    description: 'Email do usuário',
    example: 'georginho123@gmail.com',
  })
  Email: string;

  @IsString()
  @ApiProperty({
    description: 'CPF do usuário',
    example: '12789123456',
  })
  CPF: string;

  @IsBoolean()
  @ApiProperty({
    description: 'Admin do usuário',
    example: false,
  })
  Admin: boolean;
}
