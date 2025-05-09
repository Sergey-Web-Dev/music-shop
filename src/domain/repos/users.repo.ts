import { Injectable } from "@nestjs/common";
import { UserFromToken } from "libs/security/types/jwt.types";
import {DbService} from '../../db/db.service';
import {GetUserListRequestDto} from '../../user/dtos/user-list.request.dto';

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
      }
    })
  }

  async updateUserByEmailOrId( data: any, email?: string, id?: string) {
    return  this.prismaService.user.update({
      where: {
        ...(id ? { id } : { email })
      },
      data
    })
  }

  async getAllUsers(queryOptions?: GetUserListRequestDto) {
    if(!queryOptions){
      return  this.prismaService.user.findMany({})
    }
    const { page, id, direction } = queryOptions;
    return  this.prismaService.user.findMany({
      where: {
        id: id,
      },
      orderBy: {
        id: direction === 'ASC' ? 'asc' : 'desc',
      },
      take: 10,
      skip: (page - 1) * 10,
    });
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

  async findByRefreshToken(refreshToken: string) {
    return this.prismaService.user.findFirst({
      where: {  refreshToken: refreshToken }
    });
  }

  async signOutUser(user: UserFromToken) {
    return  this.prismaService.user.update({
      where: {
        id: user.id
      },
      data: {
        refreshToken: null
      }
    })
  }
}