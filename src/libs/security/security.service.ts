import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "./types/jwt.types";
import * as crypto from 'crypto';

@Injectable()
export class SecurityService {
  constructor(private jwtService: JwtService){}

  async generateTokens(payload: JwtPayload) {
    const access_token = await
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '1d'
      })

    const refreshTokenId = this.generateUniqueRefreshTokenId(payload);
    return {
      access_token,
      refresh_token: refreshTokenId
    }
  }

  private generateUniqueRefreshTokenId(payload: JwtPayload): string {
    const uniqueId = `${payload.id}-${Date.now()}`;
    return  crypto.createHash('sha256').update(uniqueId).digest('hex');
  }
}