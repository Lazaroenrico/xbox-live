import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utilis/handle-error.utilis';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Profile> {
    const record = await this.prisma.profile.findUnique({ where: { id } });

    if (!record) {
      throw new NotFoundException(`Registro com ID '${id}' não encontrado.`);
    }

    return record;
  }

  async findOne(id: string): Promise<Profile> {
    return this.findById(id);
  }

  findAll(): Promise<Profile[]> {
    return this.prisma.profile.findMany();
  }

  async update(id: string, dto: UpdateProfileDto): Promise<Profile> {
    await this.findById(id);

    if (dto.gamesId) {

      return this.prisma.profile
        .update({
          where: { id },
          data: {
            Title: dto.Title,
            ImageUrl: dto.ImageUrl,
            userId: dto.userId,
            games: {
              connect: {
                id: dto.gamesId,
              },
            },
          },
          include: { games: true },
        })
        .catch(handleError);

    } else {
      return this.prisma.profile
        .update({
          where: { id },
          data: {
            Title: dto.Title,
            ImageUrl: dto.ImageUrl,
            userId: dto.userId,
          },
          include: { games: true },
        })
        .catch(handleError);
    }
  }

  async create(dto: CreateProfileDto): Promise<Profile> {
    return await this.prisma.profile
      .create({
        data: {
          Title: dto.Title,
          ImageUrl: dto.ImageUrl,
          userId: dto.userId,
        },
        include: { user: true },
      })
      .catch(handleError);
  }

  async delete(id: string) {
    await this.findById(id);
    await this.prisma.profile.delete({ where: { id } });
  }
}
