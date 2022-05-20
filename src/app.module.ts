import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GenderModule } from './genre/genre.module';

@Module({
  imports: [GenderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
