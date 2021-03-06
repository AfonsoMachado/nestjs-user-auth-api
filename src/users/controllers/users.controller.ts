import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { AuthUser } from '../../auth/decorators/auth-user.decorator';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @AuthUser()
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @AuthUser()
  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(Number(id));
  }

  @AuthUser()
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<any> {
    return this.usersService.update(Number(id), updateUserDto);
  }

  @AuthUser()
  @Delete(':id')
  remove(@Param('id') id: string): Promise<any> {
    return this.usersService.remove(Number(id));
  }
}
