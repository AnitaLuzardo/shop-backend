import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable } from 'typeorm';
import { ShoppingCart } from 'src/shoppingscarts/entities/shoppingscart.entity';

@Entity('users')
export class User {
	@PrimaryGeneratedColumn()
	id: number
  
	@Column()
  	name: string

	@Column()
	lastname: string

	@Column()
	phone: number

	@Column()
	email: string

	@Column()
	pwd: string

	@OneToMany(() => ShoppingCart, (shoppingcart) => shoppingcart.user)
	shoppingscarts: ShoppingCart[]
}
