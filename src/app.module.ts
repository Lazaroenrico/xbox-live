import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GamesModule } from './games/games.module';
import { GenreModule } from './genre/genre.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [GenreModule, PrismaModule, GamesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
