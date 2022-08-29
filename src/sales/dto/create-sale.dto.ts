import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateSaleDto {
  @ApiProperty()
  product: string;

  // @ApiProperty()
  // products: Product[];

  @ApiProperty()
  @IsNotEmpty()
  seller: number;
}
