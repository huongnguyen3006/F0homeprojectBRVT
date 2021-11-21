import { Module } from '@nestjs/common';
import { VolunteerService } from './volunteer.service';
import { VolunteerController } from './volunteer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Volunteer } from './volunteer.entity';
import { UserModule } from 'src/user/user.module';
import { F0Module } from 'src/f0/f0.module';

@Module({
  imports: [TypeOrmModule.forFeature([Volunteer]), UserModule, F0Module],
  providers: [VolunteerService],
  controllers: [VolunteerController],
  exports: [VolunteerService],
})
export class VolunteerModule {}
