import { Module } from '@nestjs/common';
import { F0Service } from './f0.service';
import { F0Controller } from './f0.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { F0 } from './f0.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([F0]), UserModule],
  providers: [F0Service],
  controllers: [F0Controller],
  exports: [F0Service],
})
export class F0Module {}
