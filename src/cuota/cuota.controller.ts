/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { CuotasService } from "./cuota.service";
import { CuotaDto } from "./dto/cuotaDto";
import { RtGuard } from "src/auth/guards/rt.guard";
import { Public } from "src/auth/decorators/public.decorator";
import { AtGuard } from "src/auth/guards/at.guard";

@Controller("cuota")
export class CuotasController {
  constructor(private readonly cuotasService: CuotasService) {}

  @Public()
  @Get()
  findAll() {
    return this.cuotasService.findAll();
  }

  @Post()
  loadTable(@Body() cuotaDto: CuotaDto[]) {
    return this.cuotasService.loadTable(cuotaDto);
  }
}
