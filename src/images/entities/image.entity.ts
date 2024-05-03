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
  //Acá se especifica el tipo de entidad () => Product
  // product => product.images: Este argumento especifica 
  // cómo se puede acceder a la propiedad en la entidad Product que almacena 
  // todas las imágenes asociadas a ese producto.
}
