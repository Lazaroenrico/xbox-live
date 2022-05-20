import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GenderModule } from './gender/gender.module';

@Module({
  imports: [GenderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
