import { Injectable, NotFoundException, UnprocessableEntityException } from "@nestjs/common";
import { Genre } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { handleError } from "src/utilis/handle-error.utilis";
import { CreateGenreDto } from "./dto/create-genre.dto";
import { UpdateGenreDto } from "./dto/update-genre.dto";

@Injectable()
export class GenreService {


  constructor(private readonly prisma: PrismaService){}

  async findById(id: string): Promise<Genre> {
    const record = await this.prisma.genre.findUnique({ where: { id } });

    if (!record) {
      throw new NotFoundException(`Registro com ID '${id}' não encontrado.`);
    }

    return record;
  }

  async findOne(id: string): Promise<Genre> {
    return this.findById(id);
  }

  findAll(): Promise<Genre[]> {
    return this.prisma.genre.findMany();
  }

  async update(id: string, dto: UpdateGenreDto): Promise<Genre> {
    await this.findById(id);
    const data: Partial<Genre> = { ...dto };

    return this.prisma.genre
      .update({
        where: { id },
        data,
      })
      .catch(handleError);
  }

  create(dto: CreateGenreDto): Promise<Genre> {
    const data = {genre: dto.genre}

    return this.prisma.genre.create({ data }).catch(handleError);
  }

  async delete(id: string) {
    await this.findById(id);

    await this.prisma.genre.delete({ where: { id } });
  }

}
