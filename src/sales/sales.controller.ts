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

@AuthUser()
@ApiTags('sales')
@Controller('sales')
export class SalesController {
  constructor(
    private readonly salesService: SalesService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  async create(@Body() createSaleDto: CreateSaleDto) {
    const user = await this.usersService.findOne(createSaleDto.seller);
    return this.salesService.create(createSaleDto, user);
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
}
