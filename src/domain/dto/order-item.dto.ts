import { OrderItem } from "@prisma/client";
import { UUIDDto } from "./uuid.dto";

export class OrderItemDto extends UUIDDto {
  quantity: number;
  bundlePrice: number;
  available?: number;
  productId: string;
  orderId?: string;

  static fromEntity(entity?: OrderItem) {
    if(!entity) {
      return;
    }
    const it = new OrderItemDto();
    it.id = entity.id;
    it.quantity = entity.quantity;
    it.bundlePrice = entity.bundlePrice;
    it.available = entity.available;
    it.productId = entity.productId;
    it.orderId = entity.orderId;
    return it;
  }
}