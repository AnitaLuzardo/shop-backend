import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable } from 'typeorm';
import { Exclude } from 'class-transformer';
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
	@Exclude() // Excluir el campo pwd de la serialización
	pwd: string

	@OneToMany(() => ShoppingCart, (shoppingcart) => shoppingcart.user)
	shoppingscarts: ShoppingCart[]
}
