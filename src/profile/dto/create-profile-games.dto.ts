import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class createProfileGamesDto {
  @IsUUID()
  @ApiProperty({
    description: 'ID do usuário',
    example: 'e1bc0c89-a319-44df-a6e9-db66fe7b956b',
  })
  gamesId: string[];
}
