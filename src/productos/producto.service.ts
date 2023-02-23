/* eslint-disable prettier/prettier */
import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DolaresService } from "src/dolar/dolar.service";
import { Repository } from "typeorm";
import { ProductoDto } from "./dto/productoDto";
import { Producto } from "./entities/producto.entity";

@Injectable()
export class ProductosService {
  @Inject(DolaresService) private readonly dolaresService: DolaresService;
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>
  ) {}

  async findAll() {
    const productos = await this.productoRepository.find();
    const valorDolar = await this.dolaresService.obtenerUltimo();
    const listadoProductos = [];
    productos.forEach((prod) => {
      const dto = new ProductoDto();
      dto.proveedor = prod.proveedor;
      dto.producto = prod.producto;
      dto.categoria = prod.categoria;
      dto.precioEfectivo =
        Math.round(
          (prod.precio as number) * (valorDolar.precioDolar as number) * 100
        ) / 100;
      dto.precioTarjeta =
        Math.round(
          (prod.precio as number) * (valorDolar.precioTarjeta as number) * 100
        ) / 100;
      dto.Cuota = Math.round(((dto.precioTarjeta as number) / 12) * 100) / 100;
      listadoProductos.push(dto);
    });
    return listadoProductos;
  }

  async findByKeyWord(keywords: String[]) {
    const productos = await this.productoRepository.find();
    const listadoProductos = [];
    const valorDolar = await this.dolaresService.obtenerUltimo();
    const palabra1 = keywords[0] != null ? keywords[0] : "";
    const palabra2 = keywords[1] != null ? keywords[1] : "";
    const palabra3 = keywords[2] != null ? keywords[2] : "";
    productos
      .filter(
        (x) =>
          x.producto.toLowerCase().includes(palabra1.toLowerCase()) &&
          x.producto.toLowerCase().includes(palabra2.toLowerCase()) &&
          x.producto.toLowerCase().includes(palabra3.toLowerCase())
      )
      .forEach((prod) => {
        const dto = new ProductoDto();
        dto.proveedor = prod.proveedor;
        dto.producto = prod.producto;
        dto.categoria = prod.categoria;
        dto.precioEfectivo =
          Math.round(
            (prod.precio as number) * (valorDolar.precioDolar as number) * 100
          ) / 100;
        dto.precioTarjeta =
          Math.round(
            (prod.precio as number) * (valorDolar.precioTarjeta as number) * 100
          ) / 100;
        dto.Cuota =
          Math.round(((dto.precioTarjeta as number) / 12) * 100) / 100;
        listadoProductos.push(dto);
      });
    return listadoProductos;
  }

  async findByCategory(param1: string) {
    const productos = await this.productoRepository.find();
    const valorDolar = await this.dolaresService.obtenerUltimo();
    const listadoProductos = [];
    productos
      .filter((x) => x.categoria.toLowerCase().includes(param1.toLowerCase()))
      .forEach((prod) => {
        const dto = new ProductoDto();
        dto.proveedor = prod.proveedor;
        dto.producto = prod.producto;
        dto.categoria = prod.categoria;
        dto.precioEfectivo =
          Math.round(
            (prod.precio as number) * (valorDolar.precioDolar as number) * 100
          ) / 100;
        dto.precioTarjeta =
          Math.round(
            (prod.precio as number) * (valorDolar.precioTarjeta as number) * 100
          ) / 100;
        dto.Cuota =
          Math.round(((dto.precioTarjeta as number) / 12) * 100) / 100;
        listadoProductos.push(dto);
      });
    return listadoProductos;
  }
}
