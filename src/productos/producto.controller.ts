/* eslint-disable prettier/prettier */
import {
  Body,
    Controller,
    Get,
    Param,
    ParseArrayPipe,
    Query,
  } from '@nestjs/common';
import { ProductosService } from './producto.service';

  @Controller('productos')
  export class ProductosController {
    constructor(private readonly productosService: ProductosService) {}

    @Get()
  findAll() {
    return this.productosService.findAll();
  }

  @Get('/buscarPorPalabraClave/')
  findByKeyWord(@Query('keywords', new ParseArrayPipe({ items: String, separator: ',' }))
  keywords: String[],) {
    return this.productosService.findByKeyWord(keywords);
  }

  @Get('categoria/')
  findByCategory(@Query('param1') param1: string){
    return this.productosService.findByCategory(param1);
  }

}