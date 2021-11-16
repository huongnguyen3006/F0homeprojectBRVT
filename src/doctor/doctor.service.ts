import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from  'typeorm';
import {Doctor} from './doctor.entity'

@Injectable()
export class DoctorService {
    constructor(
        @InjectRepository(Doctor)
        private readonly doctorRepo: Repository <Doctor>,
    ){}
    async findAll(): Promise <Doctor []> {
        return await this.doctorRepo.find()
    };
    async findOne (Id: number): Promise<Doctor>{
        return await this.doctorRepo.findOne(Id)
    };
    async create (doctor: Doctor): Promise <Doctor> {
        return await this.doctorRepo.save(doctor)
    }
    async update (doctor: Doctor): Promise <UpdateResult> {
        return await this.doctorRepo.update(doctor.Id, doctor)
    }
    async delete (Id): Promise <DeleteResult> {
        return await this.doctorRepo.delete(Id)
}
}

