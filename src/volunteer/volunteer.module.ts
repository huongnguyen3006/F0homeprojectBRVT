import { Module } from '@nestjs/common';
import { VolunteerService } from './volunteer.service';
import { VolunteerController } from './volunteer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Volunteer } from './volunteer.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Volunteer]), UserModule],
  providers: [VolunteerService],
  controllers: [VolunteerController],
  exports: [VolunteerService],
})
export class VolunteerModule {}
