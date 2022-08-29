import { ApiProperty } from '@nestjs/swagger';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';

@Entity()
export class Sale {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  // @ApiProperty()
  // @OneToMany(() => Product, (product) => product.barCode)
  // products: Product[];

  @ApiProperty()
  @OneToOne(() => User)
  @JoinColumn()
  seller: User;

  @ApiProperty()
  @CreateDateColumn()
  date: Date;
}
