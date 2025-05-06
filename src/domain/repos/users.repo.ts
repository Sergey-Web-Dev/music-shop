import { Injectable } from "@nestjs/common";
import { UserFromToken } from "libs/security/types/jwt.types";
import {DbService} from '../../db/db.service';

@Injectable()
export class UsersRepo {
  constructor(private prismaService: DbService){}

  async createUser(email: string, hashedPassword: string) {
    return  this.prismaService.user.create({
      data: {
        email,
        hashedPassword
      }
    })
  }

  async getUserByEmail(email: string) {
    return  this.prismaService.user.findUnique({
      where: {
        email
      }
    })
  }

  async getUserById(id: string) {
    return  this.prismaService.user.findUnique({
      where: {
        id
      },
      include: {
        orders: true
      }
    })
  }

  async setRefreshToken(id: string, refreshToken: string) {
    return  this.prismaService.user.update({
      where: {
        id
      },
      data: {
        refreshToken
      }
    })
  }

  async signOutUser(user: UserFromToken) {
    return  this.prismaService.user.update({
      where: {
        id: user.sub
      },
      data: {
        refreshToken: null
      }
    })
  }
}