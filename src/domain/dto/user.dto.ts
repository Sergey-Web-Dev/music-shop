import { Order, User } from "@prisma/client";
import { UUIDDto } from "./uuid.dto";

export class UserDto extends UUIDDto {
  email: string;
  hashedPassword?: string;
  firstName?: string;
  lastName?: string;
  refreshToken?: string;
  orders?: Order[];

  static fromEntity(entity?: User & { orders?: Order[] }) {
    if(!entity) {
      return;
    }
    const it = new UserDto();
    it.id = entity.id;
    it.created_at = entity.createdAt.valueOf();
    it.updated_at = entity.updatedAt.valueOf();
    it.email = entity.email;
    it.firstName = entity.firstName;
    it.lastName = entity.lastName;
    it.refreshToken = entity.refreshToken;
    it.orders = entity.orders;
    return it;
  }
}