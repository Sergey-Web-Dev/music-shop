import { OrderItem, Product } from "@prisma/client";
import { UUIDDto } from "./uuid.dto";

export class ProductDto extends UUIDDto {
  name: string;
  image: string;
  price: number;
  quantityAvailable: number;
  description?: string;
  orderItems?: OrderItem[];

  static fromEntity(entity?: Product & { orderItems?: OrderItem[] }) {
    if(!entity) {
      return
    }
    const it = new ProductDto();
    it.id = entity.id;
    it.created_at = entity.createdAt.valueOf();
    it.updated_at = entity.updatedAt.valueOf();
    it.name = entity.name;
    it.image = entity.image;
    it.price = entity.price;
    it.quantityAvailable = entity.quantityAvailable;
    it.description = entity.description;
    it.orderItems = entity.orderItems;
    return it;
  }

  static fromEntities(entities?: Product[]) {
    if(!entities?.map) {
      return;
    }
    return entities.map((entity) => this.fromEntity(entity));
  }
}