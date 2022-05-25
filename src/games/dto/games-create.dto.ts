import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateGamesDto {
  @IsString()
  @ApiProperty({
    description: 'Games que possuem nome, descrição, preço e avaliação.',
    example: 'Sea of Thieves',
  })
  Title: string;

  @IsString()
  @ApiProperty({
    example:
      'Sea of Thieves oferece a experiência pirata definitiva, desde navegar e lutar até explorar e pilhar - tudo o que você precisa para viver a vida pirata e se tornar uma lenda por seus feitos. Sem nenhum papel definido, você tem total liberdade para interagir com o mundo e os outros jogadores como preferir.',
  })
  Description: string;

  @IsNumber()
  @ApiProperty({
    example: 199,
  })
  Price: number;

  @IsString()
  @ApiProperty({
    example:
      'https://store-images.s-microsoft.com/image/apps.16347.14554784103656548.6c0bfca6-ceff-4368-9bde-2fe50f344136.007dce43-6492-46f2-bb2b-2b28df98fc3c',
  })
  CoverImgURL: string;

  @IsNumber()
  @ApiProperty({
    example: 2018,
  })
  Year: number;

  @IsNumber()
  @ApiProperty({
    example: 5,
  })
  ImdbScore: number;

  @IsString()
  @ApiProperty({
    example: 'https://www.youtube.com/watch?v=r5JIBaasuE8',
  })
  TrailerYoutubeUrl: string;

  @IsString()
  @ApiProperty({
    example:
      'https://www.youtube.com/watch?v=TsuRGkeN22I&list=PLrVhyUnEQMV83h4gQ1CPIHut5swRfuU0B',
  })
  GameplayYoutubeUrl: string;
}
