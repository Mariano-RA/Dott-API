/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { DolaresService } from "./dolar.service";
import { DolarDto } from "./dto/dolarDto";
import { RtGuard } from "src/auth/guards/rt.guard";
import { Public } from "src/auth/decorators/public.decorator";
import { AuthorizationGuard } from "src/authTest/authorization.guard";

@Controller("dolar")
export class DolaresController {
  constructor(private readonly dolaresService: DolaresService) {}

  @Get()
  getLastOne() {
    return this.dolaresService.getLastOne();
  }

  @UseGuards(AuthorizationGuard)
  @Post()
  create(@Body() dolarDto: DolarDto) {
    return this.dolaresService.create(dolarDto);
  }
}
