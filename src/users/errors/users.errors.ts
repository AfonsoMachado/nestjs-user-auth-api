import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';

class UsersErrorHandler {
  public validUserDto(createUserDto: CreateUserDto) {
    if (!createUserDto.email)
      throw new BadRequestException('E-mail é um campo obrigatório.');

    if (!createUserDto.password)
      throw new BadRequestException('Senha é um campo obrigatório.');
  }

  public validCreate(user: User) {
    if (user)
      throw new BadRequestException(
        'O usuário já está registrado na base de dados.',
      );
  }

  public userNotFound(id: number) {
    throw new NotFoundException(
      `Usuário de id #${id} não encontrado na base de dados.`,
    );
  }

  public usersEmpty() {
    throw new BadRequestException(
      'Não existem usuários registrados na base de dados.',
    );
  }
}

export const UsersErrors = new UsersErrorHandler();
