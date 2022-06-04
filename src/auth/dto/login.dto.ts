import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto{
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description:"Nickname do usuário",
    example:'Lázaro'
  })
  Name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description:"Senha do usuário",
    example:'Naoseias2senhas!'
  })
  Password: string
}
