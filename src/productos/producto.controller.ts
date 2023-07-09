/* eslint-disable prettier/prettier */
import { Controller, Get, ParseArrayPipe, Query } from "@nestjs/common";
import { ProductosService } from "./producto.service";
import { IsNull } from "typeorm";

@Controller("productos")
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Get()
  async findAll() {
    return this.productosService.findAll();
  }

  @Get("/buscarPorPalabrasClaves/")
  findByKeyWord(
    @Query("keywords", new ParseArrayPipe({ items: String, separator: "," }))
    keywords: String[]
  ) {
    return this.productosService.findByKeyWord(keywords);
  }

  @Get("categoria/")
  findByCategory(@Query("category") category: string) {
    return this.productosService.findByCategory(category);
  }

  @Get("palabrasClavesYCategoria/")
  findByKeyWordAndCategory(
    @Query("category") category: string,
    @Query("keywords", new ParseArrayPipe({ items: String, separator: "," }))
    keywords: String[]
  ) {
    return this.productosService.findByKeyWordAndCategory(keywords, category);
  }
}
