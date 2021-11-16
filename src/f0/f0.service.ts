import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from  'typeorm';
import {F0} from './f0.entity'

@Injectable()
export class F0Service {
    constructor(
        @InjectRepository(F0)
        private readonly f0Repo: Repository <F0>,
    ){}
    async findAll(): Promise <F0 []> {
        return await this.f0Repo.find()
    };
    async findOne (Id: number): Promise<F0>{
        return await this.f0Repo.findOne(Id)
    };
    async create (f0: F0): Promise <F0> {
        return await this.f0Repo.save(f0)
    }
    async update (f0: F0): Promise <UpdateResult> {
        return await this.f0Repo.update(f0.Id, f0)
    }
    async delete (Id): Promise <DeleteResult> {
        return await this.f0Repo.delete(Id)
}
}

