/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { DolaresService } from "./dolar.service";
import { DolarDto } from "./dto/dolarDto";
import { RtGuard } from "src/auth/guards/rt.guard";
import { Public } from "src/auth/decorators/public.decorator";

@Controller("dolar")
export class DolaresController {
  constructor(private readonly dolaresService: DolaresService) {}

  @Public()
  @Get()
  getLastOne() {
    return this.dolaresService.getLastOne();
  }

  @Post()
  create(@Body() dolarDto: DolarDto) {
    return this.dolaresService.create(dolarDto);
  }
}
