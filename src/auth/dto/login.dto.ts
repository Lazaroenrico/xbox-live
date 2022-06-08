import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto{
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description:"Email do usuário",
    example:'georginho123@gmail.com'
  })
  Email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description:"Senha do usuário",
    example:'Naoseias2senhas!'
  })
  Password: string
}
