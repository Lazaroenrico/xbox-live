import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

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
  }

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

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
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
      .catch(this.handleError);
  }

  async create(dto: CreateUserDto): Promise<User> {
    delete dto.confirmPassword;

    if (dto.confirmPassword != dto.confirmPassword) {
      throw new BadRequestException('As senhas digitas estão diferentes.');
    }

    const data: User = {
      ...dto,
      Password: await bcrypt.hash(dto.Password, 10),
    };

    return this.prisma.user.create({ data }).catch(this.handleError);
  }

  async delete(id: string) {
    await this.findById(id);

    await this.prisma.user.delete({ where: { id } });
  }

  handleError(error: Error): undefined {
    const errorLines = error.message?.split('\n');
    const lastErrorLine = errorLines[errorLines.length - 1]?.trim();
    throw new UnprocessableEntityException(
      lastErrorLine || 'Ocorreu um erro durante a execução do codigo',
    );
  }
}
