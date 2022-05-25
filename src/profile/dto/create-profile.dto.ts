import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';

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
}
