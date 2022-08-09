import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HomepageService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll(id: string) {
    const profileData = await this.prisma.profile.findUnique({
      where: {
        id: id,
      },
      select: {
        Title: true,
        ImageUrl: true,
        games: {
          include: {
            genres: true,
          },
        },
        gamesFavorite:{
          select:{
            games: true
          }
        }

    }});
    const listGames = profileData.games;
    const favoriteGames = profileData.gamesFavorite;
    const orderedGames = [];
    const allGenres = await this.prisma.genre.findMany();
    allGenres.map((genre) => {
      const gamesperGenre = [];
      const IdGame = [];
      listGames.map((game) => {
        if (game.genres[0].name == genre.name) {
          gamesperGenre.push(game.Title);
          IdGame.push(game.id);
        }
      });
      const genderObj = {
        genre: genre.name,
        title: gamesperGenre,
        id: IdGame,
      };
      if (gamesperGenre.length !== 0) {
        orderedGames.push(genderObj);
      }
    });
    return {
      games: orderedGames,
      favoriteGames: favoriteGames,
    };
  }
}
