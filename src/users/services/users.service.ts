import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private contactRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    console.log('This action adds a new user');
    return await this.contactRepository.save(createUserDto);
  }

  async findAll(): Promise<User[]> {
    console.log('This action returns all users');
    return await this.contactRepository.find();
  }

  async findOne(id: number): Promise<User> {
    console.log(`This action returns a #${id} user`);
    return await this.contactRepository.findOne({ where: [{ id }] });
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    console.log(`This action updates a #${id} user`);
    return await this.contactRepository.update(id, updateUserDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    console.log(`This action removes a #${id} user`);
    return await this.contactRepository.delete(id);
  }
}
