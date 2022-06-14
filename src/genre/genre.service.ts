import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Genre } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/user/entities/user.entity';
import { handleError } from 'src/utilis/handle-error.utilis';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Gender } from './entities/genre.entity';

@Injectable()
export class GenreService {
  constructor(private readonly prisma: PrismaService) { }

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

  async update(user:User, name: string, dto: UpdateGenreDto): Promise<Genre> {
    if (user.Admin) {
    await this.findById(name);
    const data: Partial<Genre> = { ...dto };

    return this.prisma.genre
      .update({
        where: { name },
        data,
      })
      .catch(handleError);
    }else {
      throw new UnauthorizedException('O usuário não é um admin, contate-o o admin para acessar essa informação !')
    }
  }

  create(user: User, dto: CreateGenreDto): Promise<Genre> {
    if (user.Admin) {
      const genre: Gender = { ...dto };

      return this.prisma.genre.create({ data: genre }).catch(handleError);
    } else {
      throw new UnauthorizedException('O usuário não é um admin, contate-o o admin para acessar essa informação !')
    }
  }

  async delete(user:User, name: string) {
    if (user.Admin) {
      await this.findById(name);

      await this.prisma.genre.delete({ where: { name } });
    } else {
      throw new UnauthorizedException('O usuário não é um admin, contate-o o admin para acessar essa informação !')
    }
  }

}
