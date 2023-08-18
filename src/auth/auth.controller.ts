import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public } from "./decorators/public.decorator";
import { AuthDto } from "./dto/auth.dto";
import { Tokens } from "./types/tokens.type";
import { GetCurrentUserId } from "./decorators/get-current-user-id.decorator";
import { RtGuard } from "./guards/rt.guard";
import { GetCurrentUser } from "./decorators/get-current-user.decorator";
import { RefreshDto } from "./dto/refresh.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post("signup")
  @HttpCode(HttpStatus.CREATED)
  signupLocal(@Body() dto: AuthDto) {
    return this.authService.signupLocal(dto);
  }

  @Public()
  @Post("signin")
  @HttpCode(HttpStatus.OK)
  signinLocal(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signinLocal(dto);
  }

  @Public()
  @Post("logout")
  @HttpCode(HttpStatus.OK)
  logout(@Body() userId: number): Promise<boolean> {
    return this.authService.logout(userId);
  }

  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  refreshTokens(@Body() refreshDto: RefreshDto) {
    return this.authService.refreshTokens(refreshDto);
  }
}
