import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HomepageService {
  constructor(private readonly prisma: PrismaService) { }

  async findAll(id: string) {

    const data = await this.prisma.profile.findUnique({
      where: { id },
      select: {
        Title: true,
        ImageUrl: true,
        games: {
          include: {
            genres: true
          }
        },
        gamesFavorite: {
          select: {
            games: true,
          }
        }
      }
    })

    const profileName = data.Title

    return { GamesFavorite: data.gamesFavorite }
  }
}
