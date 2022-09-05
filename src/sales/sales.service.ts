import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { Sale } from './entities/sale.entity';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private saleRepository: Repository<Sale>,
  ) {}

  async create(user: User, products: Product[]) {
    return await this.saleRepository.save({ seller: user, products: products });
  }

  async findAll() {
    console.log(await this.saleRepository.find());
    return await this.saleRepository.find({
      loadRelationIds: { relations: ['seller', 'products'] },
    });
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
