import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: { Email: string }) {
    const user = await this.prisma.user.findUnique({
      where: { Email: payload.Email },
    });

    if (!user) {
      throw new UnauthorizedException(
        'Usuário não está autenticado ou não existe.',
      );
    }

    delete user.Password;

    return user;
  }
}
