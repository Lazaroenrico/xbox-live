import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const { Name, Password } = loginDto;

    const user = await this.prisma.user.findUnique({ where: { Name } });

    if (!user) {
      throw new UnauthorizedException('Usuário e/ou senha inválidos');
    }

    // Validação de senha

    const isHasValid = bcrypt.compare(Password, user.Password);

    if (!isHasValid) {
      throw new UnauthorizedException('Usuário e/ou senha inválidos');
    }

    delete user.Password;

    return {
      token: this.jwtService.sign({ Name }),
      user,
    };
  }
}
