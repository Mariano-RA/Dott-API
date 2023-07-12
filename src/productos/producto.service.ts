import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DolaresService } from "src/dolar/dolar.service";
import { Repository } from "typeorm";
import { ProductoDto } from "./dto/productoDto";
import { Producto } from "./entities/producto.entity";

function obtenerPrecioEfectivo(monto, dolar) {
  return Math.round(monto * dolar);
}

function obtenerPrecioTarjeta(monto, interes, dolar) {
  return Math.round(monto * interes * dolar);
}

function obtenerValorCuota(monto, cantidadCuotas) {
  return Math.round(monto / cantidadCuotas);
}

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
    productos.map((prod) => {
      const dto = new ProductoDto();
      dto.proveedor = prod.proveedor;
      dto.producto = prod.producto;
      dto.categoria = prod.categoria;
      dto.precioEfectivo = obtenerPrecioEfectivo(
        prod.precio,
        valorDolar.precioDolar
      );
      dto.precioTarjeta = obtenerPrecioTarjeta(
        prod.precio,
        valorDolar.precioTarjeta,
        valorDolar.precioDolar
      );
      dto.Cuota = obtenerValorCuota(dto.precioTarjeta, 12);
      listadoProductos.push(dto);
    });
    return listadoProductos.sort((a, b) => a.precioEfectivo - b.precioEfectivo);
  }

  async findAllCategories() {
    const productos = await this.productoRepository.find();
    const categoriasSet = new Set();

    productos.forEach((prod) => {
      categoriasSet.add(prod.categoria);
    });

    const categorias = Array.from(categoriasSet); // Convertir el conjunto a un array

    return categorias.sort();
  }

  async findByKeyWord(keywords: String[]) {
    const productos = await this.productoRepository.find();
    const listadoProductos = [];
    const valorDolar = await this.dolaresService.obtenerUltimo();
    productos
      .filter((x) =>
        keywords.every((word) =>
          x.producto.toLowerCase().includes(word.toLowerCase())
        )
      )
      .map((prod) => {
        const dto = new ProductoDto();
        dto.proveedor = prod.proveedor;
        dto.producto = prod.producto;
        dto.categoria = prod.categoria;
        dto.precioEfectivo = obtenerPrecioEfectivo(
          prod.precio,
          valorDolar.precioDolar
        );
        dto.precioTarjeta = obtenerPrecioTarjeta(
          prod.precio,
          valorDolar.precioTarjeta,
          valorDolar.precioDolar
        );
        dto.Cuota = obtenerValorCuota(dto.precioTarjeta, 12);
        listadoProductos.push(dto);
      });
    return listadoProductos.sort((a, b) => a.precioEfectivo - b.precioEfectivo);
  }

  async findByCategory(category: string) {
    const productos = await this.productoRepository.find();
    const valorDolar = await this.dolaresService.obtenerUltimo();
    const listadoProductos = [];
    productos
      .filter((x) => x.categoria.toLowerCase().includes(category.toLowerCase()))
      .map((prod) => {
        const dto = new ProductoDto();
        dto.proveedor = prod.proveedor;
        dto.producto = prod.producto;
        dto.categoria = prod.categoria;
        dto.precioEfectivo = obtenerPrecioEfectivo(
          prod.precio,
          valorDolar.precioDolar
        );
        dto.precioTarjeta = obtenerPrecioTarjeta(
          prod.precio,
          valorDolar.precioTarjeta,
          valorDolar.precioDolar
        );
        dto.Cuota = obtenerValorCuota(dto.precioTarjeta, 12);
        listadoProductos.push(dto);
      });
    return listadoProductos.sort((a, b) => a.precioEfectivo - b.precioEfectivo);
  }

  async findByKeyWordAndCategory(keywords: String[], category: string) {
    const productos = await this.productoRepository.find();
    const valorDolar = await this.dolaresService.obtenerUltimo();
    const listadoProductos = [];
    productos
      .filter(
        (x) =>
          keywords.every((word) =>
            x.producto.toLowerCase().includes(word.toLowerCase())
          ) && x.categoria.toLowerCase().includes(category.toLowerCase())
      )
      .map((prod) => {
        const dto = new ProductoDto();
        dto.proveedor = prod.proveedor;
        dto.producto = prod.producto;
        dto.categoria = prod.categoria;
        dto.precioEfectivo = obtenerPrecioEfectivo(
          prod.precio,
          valorDolar.precioDolar
        );
        dto.precioTarjeta = obtenerPrecioTarjeta(
          prod.precio,
          valorDolar.precioTarjeta,
          valorDolar.precioDolar
        );
        dto.Cuota = obtenerValorCuota(dto.precioTarjeta, 12);
        listadoProductos.push(dto);
      });
    return listadoProductos.sort((a, b) => a.precioEfectivo - b.precioEfectivo);
  }
}
