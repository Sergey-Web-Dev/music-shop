import { IsNumber, IsUUID } from "class-validator";

export class CreateOrderItemDto {
  @IsUUID()
  productId: string;

  quantity?: string;
}

export class OrderItemDto {
  @IsUUID()
  productId: string;

  quantity?: number;

  @IsNumber()
  bundlePrice: number;
}