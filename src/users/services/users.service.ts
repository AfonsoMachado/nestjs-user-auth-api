import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    await this.validCreate(createUserDto);
    return await this.userRepository.save(createUserDto);
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();

    if (users.length === 0) await this.usersEmpty();

    return users;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: [{ id }] });

    if (!user) await this.userNotFound(id);

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<any> {
    const updateResult = await this.userRepository.update(id, updateUserDto);

    if (updateResult.affected === 0) await this.userNotFound(id);

    return {
      message: `Usuário de id #${id} alterado com sucesso.`,
    };
  }

  async remove(id: number): Promise<any> {
    const deleteResult = await this.userRepository.delete(id);

    if (deleteResult.affected === 0) await this.userNotFound(id);

    return {
      message: `Usuário de id #${id} removido com sucesso.`,
    };
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: [{ email }] });
  }

  public async validCreate(createUserDto: CreateUserDto) {
    if (!createUserDto.email)
      throw new BadRequestException('E-mail é um campo obrigatório.');

    if (!createUserDto.password)
      throw new BadRequestException('Senha é um campo obrigatório.');

    const userRegistred = await this.findByEmail(createUserDto.email);
    if (userRegistred)
      throw new BadRequestException(
        'O usuário já está registrado na base de dados.',
      );
  }

  public async userNotFound(id: number) {
    throw new NotFoundException(
      `Usuário de id #${id} não encontrado na base de dados.`,
    );
  }

  public async usersEmpty() {
    throw new BadRequestException(
      'Não existem usuários registrados na base de dados.',
    );
  }
}
