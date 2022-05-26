import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, IsUUID } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @ApiProperty({
    description:"Nome do perfil",
    example: 'George059',
  })
  Title: string;

  @IsUrl()
  @ApiProperty({
    description:"Imagem do perfil",
    example:
      'https://filestore.community.support.microsoft.com/api/profileimages/6b031d78-c348-4636-9e2a-09b5503ba0b8',
  })
  ImageUrl: string;

  @IsUUID()
  @ApiProperty({
    description: 'ID do usuário',
    example: 'e1bc0c89-a319-44df-a6e9-db66fe7b956b',
  })
  userId: string
}
