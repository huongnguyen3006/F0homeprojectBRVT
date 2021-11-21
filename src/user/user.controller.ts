import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import RequestWithUser from 'src/auth/interfaces/request-with-user';
import { Permission } from 'src/permissions/permission.enum';
import { RequirePermissions } from 'src/permissions/require-permissions.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('users')
@RequirePermissions(Permission.ADMIN)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('me')
  getLoginUser(@Request() req: RequestWithUser) {
    const { id } = req.user;
    console.log(req.user);
    return this.userService.findOneOrFail(id);
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
