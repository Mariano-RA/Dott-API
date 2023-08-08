/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { CuotasService } from "./cuota.service";

@Controller("cuota")
export class CuotasController {
  constructor(private readonly cuotasService: CuotasService) {}

  @Get()
  obtenerValorCuotas() {
    return this.cuotasService.obtenerValorCuotas();
  }
}
