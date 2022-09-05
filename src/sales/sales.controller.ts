import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthUser } from 'src/auth/decorators/auth-user.decorator';
import { UsersService } from 'src/users/services/users.service';
import { ProductsService } from 'src/products/products.service';

@AuthUser()
@ApiTags('sales')
@Controller('sales')
export class SalesController {
  constructor(
    private readonly salesService: SalesService,
    private readonly usersService: UsersService,
    private readonly productsService: ProductsService,
  ) {}

  @Post()
  async create(@Body() createSaleDto: CreateSaleDto) {
    const user = await this.usersService.findOne(createSaleDto.seller);
    const products = await this.getProducts(createSaleDto.products);
    const sale = await this.salesService.create(user, products);

    return sale;
  }

  @Get()
  findAll() {
    return this.salesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSaleDto: UpdateSaleDto) {
    return this.salesService.update(+id, updateSaleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salesService.remove(+id);
  }

  async getProducts(products: number[]) {
    return Promise.all(
      products.map((productId) => this.productsService.findOne(productId)),
    );
  }
}
