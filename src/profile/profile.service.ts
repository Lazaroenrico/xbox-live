import { Injectable, NotFoundException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { handleError } from "src/utilis/handle-error.utilis";
import { CreateProfileDto } from "./dto/create-profile.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { Profile } from "./entities/profile.entity";

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {
  }

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

  async update(
    id: string,
    updateProfileDto: UpdateProfileDto
  ): Promise<Profile> {
    await this.findById(id);

    const data: Prisma.ProfileUpdateInput = {
      Title: updateProfileDto.Title,
      ImageUrl: updateProfileDto.ImageUrl,
      user: {
        connect: {
          id: updateProfileDto.userId
        }
      },
      gamesOwned: {
        connect: {
          id: updateProfileDto.gamesId
        }
      }
    };

    return this.prisma.profile
      .update({ where: { id }, data })
      .catch(handleError);
  }

  async create(createProfileDto: CreateProfileDto): Promise<Profile> {
    const profile = await this.prisma.profile
      .create({
        data: {
          Title: createProfileDto.Title,
          ImageUrl: createProfileDto.ImageUrl,
          user: {
            connect: {
              id: createProfileDto.userId
            }
          },
          gamesOwned: {
            connect: {
              id: createProfileDto.gamesId
            }
          }
        },
        include: {
          user: true,
          gamesOwned: {
            include: {
              games: true
            }
          }
        }
      })
      .catch(handleError);
    return { User: profile.user, id: profile.id, Title: profile.Title, ImageUrl: profile.ImageUrl, games: profile.gamesOwned.map(g => g.games) };
  }

  async delete(id: string) {
    await this.findById(id);

    await this.prisma.profile.delete({ where: { id } });
  }
}
