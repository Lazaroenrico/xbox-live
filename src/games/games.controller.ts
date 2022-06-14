import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';
import { CreateGamesDto } from './dto/games-create.dto';
import { UpdateGamesDto } from './dto/games-update.dto';
import { Games } from './entities/game.entity';
import { GamesService } from './games.service';


@ApiTags('games')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get()
  @ApiOperation({
    summary: 'Lista todas os games',
  })
  findAll(): Promise<Games[]> {
    return this.gamesService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Lista um game',
  })
  findOne(@Param('id') id: string): Promise<Games> {
    return this.gamesService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Criar uma game',
  })
  create(@Body() user:User, dto: CreateGamesDto): Promise<Games> {
    return this.gamesService.create(user, dto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualizar um game pelo id',
  })
  update(@Param('id') id: string, @Body() dto: UpdateGamesDto, user:User,): Promise<Games> {
    return this.gamesService.update(user, id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remover um game pelo id',
  })
  delete(@Param('id') user:User, id: string) {
    this.gamesService.delete(user, id);
  }
}
