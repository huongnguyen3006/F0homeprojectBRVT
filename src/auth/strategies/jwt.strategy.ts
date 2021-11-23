import { Injectable, UnauthorizedException } from '@nestjs/common';
import tokenExtractor from './token-extractor';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UserPayload } from '../interfaces/user-payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: tokenExtractor,
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }
  async validate(payload: UserPayload): Promise<UserPayload> {
    const { userId, role, email, doctorId, volunteerId } = payload;
    if (role === 'admin') return { userId, role, email };
    if (role === 'volunteer' && volunteerId)
      return { userId, role, email, volunteerId };
    if (role === 'doctor' && doctorId) return { userId, role, email, doctorId };
    throw new UnauthorizedException('Invalid payload!');
  }
}
