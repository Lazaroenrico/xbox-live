import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utilis/handle-error.utilis';
import { CreateGamesDto } from './dto/games-create.dto';
import { UpdateGamesDto } from './dto/games-update.dto';
import { Games } from './entities/game.entity';

@Injectable()
export class GamesService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    const record = await this.prisma.games.findUnique({
      where: {
        id: id,
      },
      include: {
        genres: true,
      },
    });
    if (!record) {
      throw new NotFoundException(`Registro com o ID '${id}' não encontrado`);
    }
    return record;
  }

  async findOne(id: string): Promise<Games> {
    return this.findById(id);
  }

  findAll(): Promise<Games[]> {
    return this.prisma.games.findMany();
  }

  async update(id: string, dto: UpdateGamesDto) {
    const gameAtual = await this.findById(id);

    const data: Prisma.GamesUpdateInput = {
      Title: dto.Title,
      Description: dto.Description,
      CoverImageUrl: dto.CoverImageUrl,
      Year: dto.Year,
      ImdbScore: dto.ImdbScore,
      TrailerYoutubeUrl: dto.TrailerYoutubeUrl,
      GameplayYoutubeUrl: dto.GameplayYoutubeUrl,
      genres: {
        disconnect: {
          name: gameAtual.genres[0].name,
        },
        connect: {
          name: dto.genreType,
        },
      },
    };

    return this.prisma.games
      .update({
        where: { id },
        data,
      })
      .catch(handleError);
  }

  async create(dto: CreateGamesDto) {
    const data: Prisma.GamesCreateInput = {
      Title: dto.Title,
      Description: dto.Description,
      Price: dto.Price,
      Year: dto.Year,
      ImdbScore: dto.ImdbScore,
      CoverImageUrl: dto.CoverImageUrl,
      TrailerYoutubeUrl: dto.TrailerYoutubeUrl,
      GameplayYoutubeUrl: dto.GameplayYoutubeUrl,
      genres: {
        connect: {
          name: dto.genreType,
        },
      },
    };

    return await this.prisma.games
      .create({
        data,
        include: {
          genres: true,
        },
      })
      .catch(handleError);
  }

  async delete(id: string) {
    await this.findById(id);

    await this.prisma.games.delete({ where: { id } });
  }
}
