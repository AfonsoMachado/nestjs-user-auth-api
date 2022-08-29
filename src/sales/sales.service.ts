import { User } from 'src/users/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { Sale } from './entities/sale.entity';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private saleRepository: Repository<Sale>,
  ) {}

  async create(createSaleDto: CreateSaleDto, user: User) {
    return await this.saleRepository.save({ seller: user });
  }

  async findAll() {
    return await this.saleRepository.find();
  }

  async findOne(id: number) {
    return await this.saleRepository.findOne({ where: [{ id }] });
  }

  async update(id: number, updateSaleDto: UpdateSaleDto) {
    // return await this.saleRepository.update(id, updateSaleDto);
    return ' ';
  }

  async remove(id: number) {
    return await this.saleRepository.delete(id);
  }
}
