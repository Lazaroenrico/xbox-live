import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utilis/handle-error.utilis';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) { }

  async findById(id: string) {
    const record = await this.prisma.profile.findUnique({
      where: { id, },
      include: { gamesFavorite: { select: { id: true, games: true } } }
    });

    if (!record) {
      throw new NotFoundException(`Registro com ID '${id}' não encontrado.`);
    }

    return record;
  }

  async findOne(id: string) {
    return this.findById(id);
  }

  findAll() {
    return this.prisma.profile.findMany(
      { include: { user: true, games: true, gamesFavorite: { select: { games: { select: { Title: true } } } } } }
    );
  }

  async update(id: string, userId: string, dto: UpdateProfileDto) {
    await this.findById(id);
    if (dto.gamesId) {
      return this.prisma.profile
        .update({
          where: { id },
          data: {
            Title: dto.Title,
            ImageUrl: dto.ImageUrl,
            userId: userId,
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
            userId: userId,
          },
          include: { games: true },
        })
        .catch(handleError);
    }
  }

  // ------------------------------------------------------------------
  async addNullandRemove(profileId: string, gameId: string) {
    const data = await this.findById(profileId);
    let favorite = false;
    if (data.gamesFavorite != null) {

      data.gamesFavorite.games.map((game) => {
        if (gameId === game.id) {
          favorite = true;
        }
      })
    } else {
      return this.prisma.gamesFavorite.create({
        data: {
          profile: {
            connect: { id: profileId },
          },
          games: {
            connect: { id: gameId }
          }
        }
      })
    }
    if (favorite) {
      return await this.prisma.gamesFavorite.update({
        where: {
          id: data.gamesFavorite.id,

        },
        data: {
          games: {
            disconnect: { id: gameId, }
          }
        }
      })
    } else {
      return await this.prisma.gamesFavorite.update({
        where: {
          id: data.gamesFavorite.id,

        },
        data: {
          games: {
            connect: { id: gameId, }
          }
        }
      })
    }
  }
  // ------------------------------------------------------------------

  async create(userId: string, dto: CreateProfileDto) {
    return await this.prisma.profile
      .create({
        data: {
          Title: dto.Title,
          ImageUrl: dto.ImageUrl,
          userId: userId,
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
