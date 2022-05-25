import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUrl, Max, Min } from 'class-validator';

export class CreateGamesDto {
  @IsString()
  @ApiProperty({
    description: 'Nome do game',
    example: 'Sea of Thieves',
  })
  Title: string;

  @IsString()
  @ApiProperty({
    description: "Descrição do game",
    example:
      'Sea of Thieves oferece a experiência pirata definitiva, desde navegar e lutar até explorar e pilhar - tudo o que você precisa para viver a vida pirata e se tornar uma lenda por seus feitos. Sem nenhum papel definido, você tem total liberdade para interagir com o mundo e os outros jogadores como preferir.',
  })
  Description: string;

  @IsNumber()
  @ApiProperty({
    description:"Valor do game",
    example: 199.90,
  })
  Price: number;

  @IsUrl()
  @ApiProperty({
    description:"Link da imagem do game",
    example:
      'https://store-images.s-microsoft.com/image/apps.16347.14554784103656548.6c0bfca6-ceff-4368-9bde-2fe50f344136.007dce43-6492-46f2-bb2b-2b28df98fc3c',
  })
  CoverImgUrl: string;

  @IsNumber()
  @ApiProperty({
    description:"Ano em que o game foi lançado",
    example: 2018,
  })
  Year: number;

  @Min(0)
  @Max(5)
  @IsNumber()
  @ApiProperty({
    description:"Avaliação do game",
    example: 5,
  })
  ImdbScore: number;

  @IsUrl()
  @ApiProperty({
    description:"Link do trailer do game ( youtube )",
    example: 'https://www.youtube.com/watch?v=r5JIBaasuE8',
  })
  TrailerYoutubeUrl: string;

  @IsUrl()
  @ApiProperty({
    description:"Gameplay do game",
    example:
      'https://www.youtube.com/watch?v=TsuRGkeN22I&list=PLrVhyUnEQMV83h4gQ1CPIHut5swRfuU0B',
  })
  GameplayYoutubeUrl: string;
}
