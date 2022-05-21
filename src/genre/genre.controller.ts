import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateGenreDto } from "./dto/create-genre.dto";
import { GenreService } from "./genre.service";


@ApiTags('Genre')
@Controller('genre')
export class GenreController{
  constructor(private readonly genreService: GenreService){}

  @Get()
  findOne(){}

  @Get()
  findAll(){
    return this.genreService.findAll()
  }

  @Post()
  create(dto: CreateGenreDto){
    return this.genreService.create()
  }

  @Patch()
  update(){}

  @Delete()
  delete(){}
}
