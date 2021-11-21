import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LocalStrategy } from './strategies/local.strategy';
import { EmailModule } from 'src/email/email.module';
import { DoctorModule } from 'src/doctor/doctor.module';
import { VolunteerModule } from 'src/volunteer/volunteer.module';

@Module({
  imports: [
    UserModule,
    DoctorModule,
    VolunteerModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: configService.get<string>('JWT_EXPIRE') },
        };
      },
      inject: [ConfigService],
    }),
    ConfigModule,
    EmailModule,
  ],
  providers: [
    AuthService,
    JwtAuthGuard,
    LocalStrategy,
    LocalAuthGuard,
    JwtStrategy,
  ],
  controllers: [AuthController],
  exports: [AuthService, JwtModule, JwtAuthGuard],
})
export class AuthModule {}
