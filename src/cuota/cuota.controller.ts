/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { CuotasService } from "./cuota.service";
import { CuotaDto } from "./dto/cuotaDto";

@Controller("cuota")
export class CuotasController {
  constructor(private readonly cuotasService: CuotasService) {}

  @Get()
  findAll() {
    return this.cuotasService.findAll();
  }

  @Post()
  loadTable(@Body() cuotaDto: CuotaDto[]) {
    return this.cuotasService.loadTable(cuotaDto);
  }
}
