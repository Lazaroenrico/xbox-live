import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";



@Controller()
export class GenderController{
  @Get()
  findOne(){}
  
  @Get()
  findAll(){}

  @Post()
  create(){}

  @Patch()
  update(){}

  @Delete()
  delete(){}
}
