import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { bcryptHash } from 'src/utils/bcrypt-util';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserRole } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepo.find();
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepo.findOne(id);
  }

  async findOneOrFail(id: number): Promise<User> {
    return await this.userRepo.findOneOrFail(id);
  }

  async create(createUserDto: CreateUserDto, role: UserRole) {
    const { password, email } = createUserDto;
    await this.checkUserEmailUnique(email);
    const hash = await bcryptHash(password);
    createUserDto.password = hash;
    const active = role === 'admin';
    const user = await this.userRepo.save({
      ...createUserDto,
      role,
      active,
    });
    delete user.password;
    return user;
  }

  async checkUserEmailUnique(email: string) {
    const dbUser = await this.findByEmail(email);
    if (dbUser)
      throw new ConflictException('Email already exists').getResponse();
  }

  async findByEmail(email: string): Promise<User> {
    const dbUser = await this.userRepo.findOne({
      email,
    });
    return dbUser;
  }

  async activateUserByEmail(email: string) {
    const user = await this.getNonActiveUserByEmail(email);
    user.active = true;
    await this.userRepo.save(user);
    return HttpStatus.OK;
  }

  async getNonActiveUserByEmail(email: string) {
    const user = await this.findByEmail(email);
    if (!user) throw new NotFoundException('User not found!');
    if (user.active)
      throw new NotAcceptableException('Email is already verified!');
    return user;
  }

  async updatePassword(email: string, password: string) {
    const user = await this.findByEmail(email);
    if (!user) throw new NotFoundException('Recruiter not found!');
    user.password = await bcryptHash(password);
    await this.userRepo.save(user);
  }

  async delete(id: number) {
    return await this.userRepo.delete(id);
  }
  async deleteAll() {
    return await this.userRepo.delete({});
  }
}
