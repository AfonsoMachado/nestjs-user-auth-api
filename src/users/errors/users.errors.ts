import { BadRequestException, NotFoundException } from '@nestjs/common';
import { User } from '../entities/user.entity';

class UsersErrorHandler {
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

  public userLoginFailed() {
    throw new BadRequestException('E-mail ou senha estão incorretos');
  }
}

export const UsersErrors = new UsersErrorHandler();
