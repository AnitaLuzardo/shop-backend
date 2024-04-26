import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('discounts')
export class Discount {
  @PrimaryGeneratedColumn()
	id: number

	@Column()
	description: String

	@Column()
	type: String
}
