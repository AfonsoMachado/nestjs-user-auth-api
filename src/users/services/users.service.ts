import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { UsersErrors } from '../errors/users.errors';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userRegistred = await this.findByEmail(createUserDto.email);
    UsersErrors.validCreate(userRegistred);

    const userDtoTransformed = await this.transformBody(createUserDto);

    return await this.userRepository.save(userDtoTransformed);
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();

    if (users.length === 0) UsersErrors.usersEmpty();

    return users;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: [{ id }] });

    if (!user) UsersErrors.userNotFound(id);

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<any> {
    const userDtoTransformed = await this.transformBody(updateUserDto);
    const updateResult = await this.userRepository.update(
      id,
      userDtoTransformed,
    );

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

  async removeAll() {
    await this.userRepository.delete({});
  }

  private async encryptPassword(password: string) {
    return await bcrypt.hash(password, 12);
  }

  private async transformBody(createUserDto: UpdateUserDto) {
    createUserDto.email &&
      (createUserDto.email = createUserDto.email.toLowerCase());
    createUserDto.password &&
      (createUserDto.password = await this.encryptPassword(
        createUserDto.password,
      ));

    return createUserDto;
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: [{ email }] });
  }

  async comparePassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }
}
