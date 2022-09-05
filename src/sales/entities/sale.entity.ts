import { ApiProperty } from '@nestjs/swagger';
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';

@Entity()
export class Sale {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @OneToMany(() => Product, (product) => product.sale)
  products: Product[];

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.sales)
  seller: User;

  @ApiProperty()
  @CreateDateColumn()
  date: Date;
}
