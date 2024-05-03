import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Product } from "src/products/entities/product.entity";

@Entity('images')
export class Image {
  @PrimaryGeneratedColumn()
  id:number

  @Column()
  url: string;

  @ManyToOne(() => Product, product => product.images)
  product: Product;
}
