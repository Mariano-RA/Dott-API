/* eslint-disable prettier/prettier */
import { Controller, Get, Inject, ParseArrayPipe, Query } from "@nestjs/common";
import { ProductosService } from "./producto.service";

@Controller("productos")
export class ProductosController {
  constructor(private readonly productosService: ProductosService,
    ) {}

  @Get()
   async findAll() {
    return this.productosService.findAll();
  }

  @Get("/buscarPorPalabraClave/")
  findByKeyWord(
    @Query("keywords", new ParseArrayPipe({ items: String, separator: "," }))
    keywords: String[]
  ) {
    return this.productosService.findByKeyWord(keywords);
  }

  @Get("categoria/")
  findByCategory(@Query("param1") param1: string) {
    return this.productosService.findByCategory(param1);
  }
}
