import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateGamesDto {
  @IsString()
  @ApiProperty({
    description: 'Games que possuem nome, descrição, preço e avaliação.',
    example: 'Sea of Thieves',
  })
  name: string;

  @IsString()
  @ApiProperty({
    example:
      'Sea of Thieves oferece a experiência pirata definitiva, desde navegar e lutar até explorar e pilhar - tudo o que você precisa para viver a vida pirata e se tornar uma lenda por seus feitos. Sem nenhum papel definido, você tem total liberdade para interagir com o mundo e os outros jogadores como preferir.',
  })
  description: string;

  @IsNumber()
  @ApiProperty({
    example: 199,
  })
  price: number;
}
