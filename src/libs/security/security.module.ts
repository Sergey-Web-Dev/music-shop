import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { SecurityService } from "./security.service";

@Module({
  imports: [JwtModule.register({})],
  providers: [SecurityService],
  exports: [SecurityService, JwtModule]
})
export class SecurityModule {}