import { Injectable, UnauthorizedException } from '@nestjs/common';
import tokenExtractor from './token-extractor';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../interfaces/jwt-payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: tokenExtractor,
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }
  async validate(payload: JwtPayload): Promise<JwtPayload> {
    const { id, role, email, doctorId, volunteerId } = payload;
    if (role === 'admin') return { id, role, email };
    if (role === 'volunteer' && volunteerId)
      return { id, role, email, volunteerId };
    if (role === 'doctor' && doctorId) return { id, role, email, doctorId };
    throw new UnauthorizedException('Invalid payload!');
  }
}
