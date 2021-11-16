import { Module } from '@nestjs/common';
import { F0Service } from './f0.service';
import { F0Controller } from './f0.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {F0} from './f0.entity'

@Module({
  imports: [TypeOrmModule.forFeature([F0])],
  providers: [F0Service],
  controllers: [F0Controller]
})
export class F0Module {}
