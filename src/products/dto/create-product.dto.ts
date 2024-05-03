import { Image } from "src/images/entities/image.entity"

export class CreateProductDto {
  name: string
  description: string
  price: number
  images: Image[]
}
