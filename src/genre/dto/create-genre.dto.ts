import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateGenreDto {
  @IsString()
  @ApiProperty({
    description: 'O Gênero do Game',
    example: 'Aventura',
  })
  name: string;
}
