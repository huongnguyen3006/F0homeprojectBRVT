import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { getConnectionOptions, Repository } from 'typeorm';
import { UserModule } from './user/user.module';
import { BasicAuthMiddleware } from './user/basic.auth.middleware';
import { UserService } from './user/user.service';
import { F0Module } from './f0/f0.module';
import { DoctorModule } from './doctor/doctor.module';
import { ExamModule } from './exam/exam.module';
import { VolunteerModule } from './volunteer/volunteer.module';


@Module({
  imports: [
    //  TypeOrmModule.forRootAsync({
    //   useFactory: async () =>
    //     Object.assign(await 
    //      getConnectionOptions(), {
    //       autoLoadEntities: true,
    //     }),
    //   }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3308,
      username: 'f0homebrvt',
      password: 'f0homebrvt',
      database: 'f0homebrvt',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],

      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule, F0Module, DoctorModule, ExamModule, VolunteerModule,

  ],
  controllers: [AppController],
  providers: [AppService ],
})




export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(BasicAuthMiddleware)
    .exclude(
      'Users/Auth/(.*)',
    )
    .forRoutes('/');
  }
}