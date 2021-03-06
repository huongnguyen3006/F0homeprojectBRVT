import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { DoctorModule } from './doctor/doctor.module';
import { ExamModule } from './exam/exam.module';
import { F0Module } from './f0/f0.module';
import { PermissionsGuard } from './permissions/permissions.guard';
import { TestResultModule } from './test-result/test-result.module';
import { UserModule } from './user/user.module';
import { VolunteerModule } from './volunteer/volunteer.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('MYSQL_HOST'),
        port: configService.get<number>('MYSQL_PORT'),
        username: configService.get<string>('MYSQL_USERNAME'),
        password: configService.get<string>('MYSQL_PASSWORD'),
        database: configService.get<string>('MYSQL_DB'),
        entities: ['dist/**/*.entity{.ts,.js}'],
        autoLoadEntities: true,
        synchronize: true,
        ssl: {
          rejectUnauthorized: false,
        },
      }),
      inject: [ConfigService],
    }),
    UserModule,
    F0Module,
    DoctorModule,
    ExamModule,
    VolunteerModule,
    AuthModule,
    TestResultModule,
  ],
  controllers: [],
  providers: [
    /* Make all controllers protected by default,
    to make a route/controller public, add @Public decorator 
    */
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
  ],
})
export class AppModule {}
