import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async generateTokens(payload) {
    const access_token = await this.jwtService.signAsync(payload);
    const refresh_token = await this.jwtService.signAsync(payload, {
      expiresIn: "7d",
    }); // Refresh token expires in 7 days

    return { access_token, refresh_token };
  }

  async registerUser(username: string, password: string): Promise<void> {
    await this.usersService.createUser(username, password);
  }

  async signIn(username, pass) {
    const user = await this.usersService.findOne(username);

    if (!user || !(await bcrypt.compare(pass, user.password))) {
      throw new UnauthorizedException("Credenciales inválidas");
    }

    const payload = { sub: user.id, username: user.username };
    // const access_token = await this.jwtService.signAsync(payload);
    const token = await this.generateTokens(payload);

    return { token };
  }

  async refreshToken(refreshToken: string) {
    try {
      const decoded = await this.jwtService.verifyAsync(refreshToken);
      console.log(decoded);

      // Here you should implement your logic to check if the refresh token is valid and associated with a user
      const user = await this.usersService.findOne(decoded.username);
      if (!user) {
        throw new UnauthorizedException("Usuario no encontrado");
      }

      const tokens = await this.generateTokens(user);

      return tokens;
    } catch (error) {
      throw new UnauthorizedException("Token de actualización inválido");
    }
  }
}
