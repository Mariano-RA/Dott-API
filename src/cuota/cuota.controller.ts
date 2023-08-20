/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { CuotasService } from "./cuota.service";
import { CuotaDto } from "./dto/cuotaDto";

import { Public } from "src/auth/decorators/public.decorator";
import { AuthorizationGuard } from "src/authTest/authorization.guard";
import { AuthGuard } from "@nestjs/passport";

@Controller("cuota")
export class CuotasController {
  constructor(private readonly cuotasService: CuotasService) {}

  // @Public()

  // @UseGuards(AuthGuard("jwt"))
  @Get()
  findAll() {
    return this.cuotasService.findAll();
  }

  @UseGuards(AuthorizationGuard)
  @Post()
  loadTable(@Body() cuotaDto: CuotaDto[]) {
    return this.cuotasService.loadTable(cuotaDto);
  }
}
