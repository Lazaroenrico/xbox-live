import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { CreateGenderDto } from "./dto/create-gender.dto";
import { GenderService } from "./gender.service";



@Controller('gender')
export class GenderController{
  constructor(private readonly genderService: GenderService){}

  @Get()
  findOne(){}

  @Get()
  findAll(){
    return this.genderService.findAll()
  }

  @Post()
  create(dto: CreateGenderDto){
    return this.genderService.create()
  }

  @Patch()
  update(){}

  @Delete()
  delete(){}
}
