import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Genre } from '@prisma/client';
import { User } from 'src/user/entities/user.entity';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { GenreService } from './genre.service';

@ApiTags('genre')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Get()
  @ApiOperation({
    summary: 'Lista todas os generos',
  })
  findAll(): Promise<Genre[]> {
    return this.genreService.findAll();
  }
  @Get(':id')
  @ApiOperation({
    summary: 'Lista um genero',
  })
  findOne(@Param('id') id: string): Promise<Genre> {
    return this.genreService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Criar uma genero',
  })
  create(@Body() user:User, dto: CreateGenreDto): Promise<Genre> {
    return this.genreService.create(user, dto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualizar um genero pelo id',
  })
  update(@Param('id') user:User, id: string, @Body() dto: UpdateGenreDto): Promise<Genre> {
    return this.genreService.update(user, id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remover um genero pelo id',
  })
  delete(@Param('id') user:User, id: string) {
    this.genreService.delete(user, id);
  }
}
