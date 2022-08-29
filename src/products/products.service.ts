import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    return await this.productRepository.save(createProductDto);
  }

  async findAll() {
    return await this.productRepository.find();
  }

  async findOne(id: number) {
    return await this.productRepository.findOne({ where: [{ id }] });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return await this.productRepository.update(id, updateProductDto);
  }

  async remove(id: number) {
    return await this.productRepository.delete(id);
  }
}
