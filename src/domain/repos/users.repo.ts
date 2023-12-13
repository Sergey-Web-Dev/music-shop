import { Injectable } from "@nestjs/common";
import { UserFromToken } from "libs/security/types/jwt.types";
import { PrismaService } from "prisma/prisma.service";

@Injectable()
export class UsersRepo {
  constructor(private prismaService: PrismaService){}

  async createUser(email: string, hashedPassword: string) {
    return await this.prismaService.user.create({
      data: {
        email,
        hashedPassword
      }
    })
  }

  async getUserByEmail(email: string) {
    return await this.prismaService.user.findUnique({
      where: {
        email
      }
    })
  }

  async getUserById(id: string) {
    return await this.prismaService.user.findUnique({
      where: {
        id
      }
    })
  }

  async setRefreshToken(id: string, refreshToken: string) {
    return await this.prismaService.user.update({
      where: {
        id
      },
      data: {
        refreshToken
      }
    })
  }

  async signOutUser(user: UserFromToken) {
    return await this.prismaService.user.update({
      where: {
        id: user.sub
      },
      data: {
        refreshToken: null
      }
    })
  }
}