import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'É necessário informar o nome do produto' })
  name: string;

  @ApiProperty()
  barCode: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'É necessário informar o preço do produto' })
  price: number;
}
