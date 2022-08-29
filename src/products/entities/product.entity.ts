import { ApiProperty } from '@nestjs/swagger';
import { Sale } from 'src/sales/entities/sale.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ unique: true })
  barCode: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @Column()
  price: number;
}
