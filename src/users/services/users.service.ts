import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { UsersErrors } from '../errors/users.errors';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    UsersErrors.validUserDto(createUserDto);

    const userRegistred = await this.findByEmail(createUserDto.email);
    UsersErrors.validCreate(userRegistred);

    return await this.userRepository.save(createUserDto);
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();

    if (users.length === 0) UsersErrors.usersEmpty();

    return users;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: [{ id }] });

    if (!user) await UsersErrors.userNotFound(id);

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<any> {
    const updateResult = await this.userRepository.update(id, updateUserDto);

    if (updateResult.affected === 0) UsersErrors.userNotFound(id);

    return {
      message: `Usuário de id #${id} alterado com sucesso.`,
    };
  }

  async remove(id: number): Promise<any> {
    const deleteResult = await this.userRepository.delete(id);

    if (deleteResult.affected === 0) UsersErrors.userNotFound(id);

    return {
      message: `Usuário de id #${id} removido com sucesso.`,
    };
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: [{ email }] });
  }
}
