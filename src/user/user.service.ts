import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utilis/handle-error.utilis';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  private userSelector = {
    id: true,
    Name: true,
    Password: false,
    Email: true,
    CPF: true,
    Admin: true,
    createdAt: true,
    updatedAt: true,
  };

  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<User> {
    const record = await this.prisma.user.findUnique({
      where: { id },
      select: this.userSelector,
    });

    if (!record) {
      throw new NotFoundException(`Registro com ID '${id}' não encontrado.`);
    }

    return record;
  }

  async findOne(id: string): Promise<User> {
    return this.findById(id);
  }

  findAll(user:User): Promise<User[]> {
    if(user.Admin){
      return this.prisma.user.findMany();
    }else {
      throw new UnauthorizedException('O usuário não é um admin, contate-o o admin para acessar essa informação !')
    }
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    await this.findById(id);

    if (dto.Password) {
      if (dto.Password != dto.Password) {
        throw new BadRequestException('As senhas digitas estão diferentes.');
      }
    }

    delete dto.confirmPassword;

    const data: Partial<User> = { ...dto };

    if (dto.Password) {
      dto.Password = await bcrypt.hash(data.Password, 10);
    }

    return this.prisma.user
      .update({
        where: { id },
        data,
      })
      .catch(handleError);
  }

  async create(dto: CreateUserDto): Promise<User> {
    if (dto.confirmPassword != dto.confirmPassword) {
      throw new BadRequestException('As senhas digitas estão diferentes.');
    }
    delete dto.confirmPassword;

    const data: User = {
      ...dto,
      Password: await bcrypt.hash(dto.Password, 10),
    };

    return this.prisma.user.create({ data }).catch(handleError);
  }

  async delete(id: string) {
    await this.findById(id);

    await this.prisma.user.delete({ where: { id } });
  }
}
