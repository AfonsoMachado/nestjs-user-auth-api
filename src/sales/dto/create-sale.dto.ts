import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateSaleDto {
  @ApiProperty()
  @IsNotEmpty()
  products: number[];

  @ApiProperty()
  @IsNotEmpty()
  seller: number;
}
