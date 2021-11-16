import { Module } from '@nestjs/common';
import { VolunteerService } from './volunteer.service';
import { VolunteerController } from './volunteer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Volunteer } from './volunteer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Volunteer])],
  providers: [VolunteerService],
  controllers: [VolunteerController]
})
export class VolunteerModule {}
