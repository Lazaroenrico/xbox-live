import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateGamesDto {
  @IsString()
  @IsNumber()
  @ApiProperty({
    description: 'O Gênero do Game',
    example: 'Terror',
  })
  name: string;
  description: string;
  price: number;
  assessment:number;
}
