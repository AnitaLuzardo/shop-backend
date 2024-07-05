import { Entity, PrimaryGeneratedColumn, ManyToMany, ManyToOne, JoinTable, Column } from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { Discount } from '../../discounts/entities/discount.entity';
import { User } from 'src/users/entities/user.entity';

@Entity({name: 'shopping_carts'})
export class ShoppingCart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  asset: boolean

  @Column()
  date_created: Date

  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[];

	@ManyToMany(() => Discount)
	@JoinTable()
	discounts: Discount[]

  @ManyToOne(() => User, user => user.shoppingscarts)
  user: User
  shoppingCart: Product;
}
