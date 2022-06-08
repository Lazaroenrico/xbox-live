import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { User } from 'src/user/entities/user.entity';

@ApiTags('profile')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) { }

  @Post()
  @ApiOperation({
    summary: 'Criar um perfil',
  })
  create(@LoggedUser() user: User, @Body() createProfileDto: CreateProfileDto) {
    return this.profileService.create(user.id, createProfileDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todos os perfis',
  })
  findAll() {
    return this.profileService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Listar um perfil',
  })
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Editar um perfil pelo ID',
  })
  update(@Param('id') id: string, @LoggedUser() user: User, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(id, user.id, updateProfileDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remover um produto ID',
  })
  delete(@Param('id') id: string) {
    this.profileService.delete(id);
  }
}
