/* eslint-disable prettier/prettier */
import { Controller, Get, ParseArrayPipe, Query } from "@nestjs/common";
import { ProductosService } from "./producto.service";
import { IsNull } from "typeorm";

@Controller("productos")
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Get()
  findAll(
    @Query("skip") skip: number,
    @Query("take") take: number,
    @Query("orderBy") orderBy: string
  ) {
    return this.productosService.findAll(skip, take, orderBy);
  }

  @Get("categorias/")
  findAllCategories() {
    return this.productosService.findAllCategories();
  }

  @Get("/buscarPorPalabrasClaves/")
  findByKeyWord(
    // @Query("keywords", new ParseArrayPipe({ items: String, separator: "," }))
    @Query("keywords") keywords: string,
    @Query("skip") skip: number,
    @Query("take") take: number,
    @Query("orderBy") orderBy: string
  ) {
    return this.productosService.findByKeyWord(keywords, skip, take, orderBy);
  }

  @Get("categoria/")
  findByCategory(
    @Query("category") category: string,
    @Query("skip") skip: number,
    @Query("take") take: number,
    @Query("orderBy") orderBy: string
  ) {
    return this.productosService.findByCategory(category, skip, take, orderBy);
  }

  @Get("palabrasClavesYCategoria/")
  findByKeyWordAndCategory(
    @Query("category") category: string,
    @Query("keywords", new ParseArrayPipe({ items: String, separator: "," }))
    keywords: String[],
    @Query("skip") skip: number,
    @Query("take") take: number,
    @Query("orderBy") orderBy: string
  ) {
    return this.productosService.findByKeyWordAndCategory(
      keywords,
      category,
      skip,
      take,
      orderBy
    );
  }
}
