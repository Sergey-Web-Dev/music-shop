import { Injectable } from '@nestjs/common';
import { UsersRepo } from 'domain/repos/users.repo';

@Injectable()
export class UserService {
  constructor(private usersRepo: UsersRepo) {}

  async getUserById(userId: string) {
    return await this.usersRepo.getUserById(userId);
  }
}
