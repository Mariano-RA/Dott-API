/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  ParseArrayPipe,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ProductosService } from "./producto.service";
import { IsNull } from "typeorm";
import { ProductoDto } from "./dto/productoDto";
import { createProductoDto } from "./dto/createProductDto";
import { RtGuard } from "src/auth/guards/rt.guard";
import { Public } from "src/auth/decorators/public.decorator";

@Controller("productos")
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Post()
  updateTable(@Body() productDto: createProductoDto[]) {
    return this.productosService.updateTable(productDto);
  }

  @Public()
  @Get()
  findAll(
    @Query("skip") skip: number,
    @Query("take") take: number,
    @Query("orderBy") orderBy: string
  ) {
    return this.productosService.findAll(skip, take, orderBy);
  }

  @Public()
  @Get("categorias/")
  findAllCategories() {
    return this.productosService.findAllCategories();
  }

  @Public()
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

  @Public()
  @Get("categoria/")
  findByCategory(
    @Query("category") category: string,
    @Query("skip") skip: number,
    @Query("take") take: number,
    @Query("orderBy") orderBy: string
  ) {
    return this.productosService.findByCategory(category, skip, take, orderBy);
  }

  @Public()
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
