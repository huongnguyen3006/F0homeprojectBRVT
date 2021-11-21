import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { F0Module } from 'src/f0/f0.module';
import { UserModule } from 'src/user/user.module';
import { DoctorController } from './doctor.controller';
import { Doctor } from './doctor.entity';
import { DoctorService } from './doctor.service';

@Module({
  imports: [TypeOrmModule.forFeature([Doctor]), UserModule, F0Module],
  providers: [DoctorService],
  controllers: [DoctorController],
  exports: [DoctorService],
})
export class DoctorModule {}
