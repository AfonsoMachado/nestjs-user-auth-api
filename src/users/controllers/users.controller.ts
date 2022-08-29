import { OkBasicResponseDto } from './../../common/dto/ok-basic-response.dto';
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
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AuthUser } from '../../auth/decorators/auth-user.decorator';
import { UnfilledFieldsError } from '../../common/decorators/unfilled-fields-error.decorator';
import { UserUnauthorizedError } from '../../common/decorators/user-unauthorized-error.decorator';
import { UserNotFoundError } from '../decorators/user-unauthorized-error.decorator';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    summary: 'Cria um usuário',
  })
  @ApiCreatedResponse({
    description: 'Usuário cadastrado com sucesso',
    type: User,
  })
  @UnfilledFieldsError()
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @AuthUser()
  @ApiOperation({
    summary: 'Lista todos os usuários',
  })
  @ApiOkResponse({
    description: 'Lista com todos os usuários cadastrados',
    type: [User],
  })
  @UserUnauthorizedError()
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @AuthUser()
  @ApiOperation({
    summary: 'Encontra um usuário por ID',
  })
  @ApiOkResponse({
    description: 'Usuário encontrado na busca',
    type: User,
  })
  @UserNotFoundError()
  @UserUnauthorizedError()
  @ApiParam({ name: 'id', required: true, description: 'ID do usuário' })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(Number(id));
  }

  @AuthUser()
  @ApiOperation({
    summary: 'Altera os dados de um usuário por ID',
  })
  @ApiOkResponse({
    description: 'Usuário alterado com sucesso',
    type: OkBasicResponseDto,
  })
  @UserNotFoundError()
  @UserUnauthorizedError()
  @ApiParam({ name: 'id', required: true, description: 'ID do usuário' })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<any> {
    return await this.usersService.update(Number(id), updateUserDto);
  }

  @AuthUser()
  @ApiOperation({
    summary: 'Deleta um usuário por ID',
  })
  @ApiOkResponse({
    description: 'Usuário deletado com sucesso',
    type: OkBasicResponseDto,
  })
  @UserNotFoundError()
  @UserUnauthorizedError()
  @ApiParam({ name: 'id', required: true, description: 'ID do usuário' })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<any> {
    return this.usersService.remove(Number(id));
  }
}
