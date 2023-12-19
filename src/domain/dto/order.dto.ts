import { $Enums, Order, OrderItem } from "@prisma/client";
import { UUIDDto } from "./uuid.dto";

export class OrderDto extends UUIDDto {
  total: number;
  status: $Enums.Statuses;
  userId: string;
  orderItems?: OrderItem[]

  static fromEntity(entity?: Order & { orderItems?: OrderItem[] }) {
    if(!entity) {
      return;
    }
    const it = new OrderDto();
    it.id = entity.id;
    it.total = entity.total;
    it.status = entity.status;
    it.userId = entity.userId;
    it.orderItems = entity.orderItems;
    return it;
  }

  static fromEntities(entities?: Order[]) {
    if(!entities?.map) {
      return;
    }
    return entities.map((entity) => this.fromEntity(entity));
  }
}