import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Genre } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utilis/handle-error.utilis';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Gender } from './entities/genre.entity';

@Injectable()
export class GenreService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(name: string): Promise<Genre> {
    const record = await this.prisma.genre.findUnique({ where: { name } });

    if (!record) {
      throw new NotFoundException(`Registro com ID '${name}' não encontrado.`);
    }

    return record;
  }

  async findOne(name: string): Promise<Genre> {
    return this.findById(name);
  }

  findAll(): Promise<Genre[]> {
    return this.prisma.genre.findMany();
  }

  async update(name: string, dto: UpdateGenreDto): Promise<Genre> {
    await this.findById(name);
    const data: Partial<Genre> = { ...dto };

    return this.prisma.genre
      .update({
        where: { name },
        data,
      })
      .catch(handleError);
  }

  create(dto: CreateGenreDto): Promise<Genre> {
    const genre: Gender = { ...dto };

    return this.prisma.genre.create({ data: genre }).catch(handleError);
  }

  async delete(name: string) {
    await this.findById(name);

    await this.prisma.genre.delete({ where: { name } });
  }
}
