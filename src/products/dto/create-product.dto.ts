import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'É necessário informar o nome do produto' })
  name: string;

  @ApiProperty()
  @IsNumber()
  barCode: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'É necessário informar o preço do produto' })
  @IsNumber()
  price: number;
}
