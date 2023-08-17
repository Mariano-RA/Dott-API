import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";
import * as bcrypt from "bcrypt";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post("login")
  signIn(@Body() signInDto: { username: string; password: string }) {
    const { username, password } = signInDto;
    return this.authService.signIn(username, password);
  }

  @UseGuards(AuthGuard)
  @Get("profile")
  getProfile(@Request() req) {
    return req.user;
  }

  @HttpCode(HttpStatus.OK)
  @Post("register")
  async register(@Body() signInDto: { username: string; password: string }) {
    const { username, password } = signInDto;
    const hashedPassword = await bcrypt.hash(password, 10); // 10 salt rounds
    return this.authService.registerUser(username, hashedPassword);
  }

  @HttpCode(HttpStatus.OK)
  @Get("refresh-token")
  async refreshToken(@Request() req) {
    const refreshToken = req.headers["refresh-token"];
    const tokens = await this.authService.refreshToken(refreshToken);
    return tokens;
  }
}
