import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from  'typeorm';
import { Volunteer } from './volunteer.entity';

@Injectable()
export class VolunteerService {
    constructor(
        @InjectRepository(Volunteer)
        private readonly volunteerRepo: Repository <Volunteer>,
    ){}
    async findAll(): Promise <Volunteer []> {
        return await this.volunteerRepo.find()
    };
    async findOne (Id: number): Promise<Volunteer>{
        return await this.volunteerRepo.findOne(Id)
    };
    async create (volunteer: Volunteer): Promise <Volunteer> {
        return await this.volunteerRepo.save(volunteer)
    }
    async update (volunteer: Volunteer): Promise <UpdateResult> {
        return await this.volunteerRepo.update(volunteer.Id, volunteer)
    }
    async delete (Id): Promise <DeleteResult> {
        return await this.volunteerRepo.delete(Id)
}
}

