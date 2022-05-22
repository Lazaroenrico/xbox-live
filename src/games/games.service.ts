import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
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
      .catch(this.handleError);
  }

  create(dto: CreateGamesDto): Promise<Games> {
    const data: Games = { ...dto };

    return this.prisma.games.create({ data }).catch(this.handleError);
  }

  async delete(id: string) {
    await this.findById(id);

    await this.prisma.games.delete({ where: { id } });
  }

  handleError(error: Error): undefined {
    const errorLines = error.message?.split('\n');
    const lastErrorLine = errorLines[errorLines.length - 1]?.trim();
    throw new UnprocessableEntityException(
      lastErrorLine || 'Alguem erro ocorreu ao executar a operação',
    );
  }
}
