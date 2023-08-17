/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { DolaresService } from "./dolar.service";
import { DolarDto } from "./dto/dolarDto";

@Controller("dolar")
export class DolaresController {
  constructor(private readonly dolaresService: DolaresService) {}

  @Get()
  getLastOne() {
    return this.dolaresService.getLastOne();
  }

  @Post()
  create(@Body() dolarDto: DolarDto) {
    return this.dolaresService.create(dolarDto);
  }
}
