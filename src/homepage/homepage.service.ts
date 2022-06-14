import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HomepageService {
  constructor(private readonly prisma: PrismaService) { }

  async findAll(id: string) {
    const data = await this.prisma.profile.findUnique({
      where: { id: id },
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

    const gameL = []
    const fullGnr = await this.prisma.genre.findMany()
    const profileG = data.games

    fullGnr.map((genre) => {
      const order = []
      profileG.map((game) => {
        if (game.genres[0].name === genre.name) {
          order.push(game.Title)
        }
      })
      const genrePorgame = {
        Title: order,
        genre: genre.name,
      }

      if (order.length !== 0) {
        gameL.push(genrePorgame)
      }

    })
    const profileF = data.gamesFavorite

    return {
      games: gameL,
      favorite: profileF,
    }
  }
}
