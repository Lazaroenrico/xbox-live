import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { GamesModule } from './games/games.module';
import { GenreModule } from './genre/genre.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProfileModule } from './profile/profile.module';
import { UserModule } from './user/user.module';
import { HomepageModule } from './homepage/homepage.module';

@Module({
  imports: [GenreModule, PrismaModule, GamesModule, ProfileModule, UserModule, AuthModule, PassportModule.register({ defaultStrategy: 'jwt' }), HomepageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
