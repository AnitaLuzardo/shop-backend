import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Image } from "src/images/entities/image.entity";

@Entity({name: 'products'})
export class Product {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	name: string

	@Column()
	description: string

	@Column()
	price: number

	@OneToMany(() => Image, image => image.product)
    images: Image[];
}
