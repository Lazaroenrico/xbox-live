import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utilis/handle-error.utilis';
import { CreateGamesDto } from './dto/games-create.dto';
import { UpdateGamesDto } from './dto/games-update.dto';
import { Games } from './entities/game.entity';

@Injectable()
export class GamesService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Games> {
    const record = await this.prisma.games.findUnique({ where: { id } });

    if (!record) {
      throw new NotFoundException(`Registro com ID '${id}' não encontrado.`);
    }

    return record;
  }

  async findOne(id: string): Promise<Games> {
    return this.findById(id);
  }

  findAll(): Promise<Games[]> {
    return this.prisma.games.findMany();
  }

  async update(id: string, dto: UpdateGamesDto): Promise<Games> {
    await this.findById(id);
    const data: Partial<Games> = { ...dto };

    return this.prisma.games
      .update({
        where: { id },
        data,
      })
      .catch(handleError);
  }

  create(dto: CreateGamesDto): Promise<Games> {
    const data: Games = { ...dto };

    return this.prisma.games.create({ data }).catch(handleError);
  }

  async delete(id: string) {
    await this.findById(id);

    await this.prisma.games.delete({ where: { id } });
  }

}
