import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DoctorModule } from './doctor/doctor.module';
import { ExamModule } from './exam/exam.module';
import { F0Module } from './f0/f0.module';
import { UserModule } from './user/user.module';
import { VolunteerModule } from './volunteer/volunteer.module';
import { AuthModule } from './auth/auth.module';
import { TestResultModule } from './test-result/test-result.module';
@Module({
  imports: [
    //  TypeOrmModule.forRootAsync({
    //   useFactory: async () =>
    //     Object.assign(await
    //      getConnectionOptions(), {
    //       autoLoadEntities: true,
    //     }),
    //   }),
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
  providers: [],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(BasicAuthMiddleware)
  //     .exclude('Users/Auth/(.*)')
  //     .forRoutes('/');
  // }
}
