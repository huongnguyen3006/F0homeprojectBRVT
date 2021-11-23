import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserPayload } from 'src/auth/interfaces/user-payload';
import { Admin } from 'src/common/decorators/admin.decorator';
import { RequestUser } from 'src/common/decorators/request-user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('users')
@Admin()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('me')
  getLoginUser(@RequestUser() user: UserPayload) {
    const { userId } = user;
    console.log(user);
    return this.userService.findOneOrFail(userId);
  }

  @Get(':id')
  get(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Post('create-admin')
  async createAdmin(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto, 'admin');
  }

  @Delete()
  async deleteAll() {
    return this.userService.deleteAll();
  }
}
