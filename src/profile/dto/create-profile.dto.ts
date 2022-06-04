import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl, IsUUID } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @ApiProperty({
    description: 'Nome do perfil',
    example: 'George059',
  })
  Title: string;

  @IsUrl()
  @ApiProperty({
    description: 'Imagem do perfil',
    example:
      'https://filestore.community.support.microsoft.com/api/profileimages/6b031d78-c348-4636-9e2a-09b5503ba0b8',
  })
  ImageUrl: string;

  @IsUUID()
  @ApiProperty({
    description: 'ID do usuário',
    example: '64cfc520-5c65-4ca1-a3ec-a3092c939440',
  })
  userId: string;

  @IsOptional()
  @IsUUID()
  @ApiProperty({
    description: 'ID do Game',
    example: 'f9660c8b-ed33-416b-9491-ed01aa41a794',
  })
  gamesId?: string;
}
