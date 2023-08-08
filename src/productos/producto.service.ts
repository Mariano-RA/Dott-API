import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DolaresService } from "src/dolar/dolar.service";
import { Repository } from "typeorm";
import { ProductoDto } from "./dto/productoDto";
import { Producto } from "./entities/producto.entity";
import { CuotasService } from "src/cuota/cuota.service";
import { valorCuotaDto } from "./dto/valorCuotaDto";

function obtenerPrecioEfectivo(monto, dolar) {
  return Math.round(monto * dolar);
}

function calcularValorCuotas(precio, listadoCuotas) {
  let listado = new Array();
  listadoCuotas.map((cuota) => {
    let valorCuota = new valorCuotaDto();
    valorCuota.CantidadCuotas = cuota.id;
    valorCuota.Total = Math.round(precio / cuota.valorTarjeta);
    valorCuota.Cuota = Math.round(precio / cuota.valorTarjeta / cuota.id);
    listado.push(valorCuota);
  });
  return listado;
}

function pagination(skip, take, items) {
  let indiceInicio = (skip - 1) * take;
  let indiceFin = indiceInicio + take;
  return items.slice(indiceInicio, indiceFin);
}

@Injectable()
export class ProductosService {
  @Inject(DolaresService) private readonly dolaresService: DolaresService;
  @Inject(CuotasService) private readonly cuotasService: CuotasService;
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>
  ) {}

  async findAll(skip: number, take: number) {
    const productos = await this.productoRepository.find();
    const valorDolar = await this.dolaresService.obtenerUltimo();
    const listadoCuotas = await this.cuotasService.obtenerValorCuotas();

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
      dto.precioCuotas = calcularValorCuotas(dto.precioEfectivo, listadoCuotas);
      listadoProductos.push(dto);
    });
    listadoProductos.sort((a, b) => a.precioEfectivo - b.precioEfectivo);
    return pagination(skip, take, listadoProductos);
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
    const valorDolar = await this.dolaresService.obtenerUltimo();
    const listadoCuotas = await this.cuotasService.obtenerValorCuotas();

    const listadoProductos = [];
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
        dto.precioCuotas = calcularValorCuotas(
          dto.precioEfectivo,
          listadoCuotas
        );
        listadoProductos.push(dto);
      });
    return listadoProductos.sort((a, b) => a.precioEfectivo - b.precioEfectivo);
  }

  async findByCategory(category: string, skip: number, take: number) {
    const productos = await this.productoRepository.find();
    const valorDolar = await this.dolaresService.obtenerUltimo();
    const listadoCuotas = await this.cuotasService.obtenerValorCuotas();
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
        dto.precioCuotas = calcularValorCuotas(
          dto.precioEfectivo,
          listadoCuotas
        );
        listadoProductos.push(dto);
      });
    listadoProductos.sort((a, b) => a.precioEfectivo - b.precioEfectivo);
    return pagination(skip, take, listadoProductos);
  }

  async findByKeyWordAndCategory(
    keywords: String[],
    category: string,
    skip: number,
    take: number
  ) {
    const productos = await this.productoRepository.find();
    const valorDolar = await this.dolaresService.obtenerUltimo();
    const listadoCuotas = await this.cuotasService.obtenerValorCuotas();
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
        dto.precioCuotas = calcularValorCuotas(
          dto.precioEfectivo,
          listadoCuotas
        );
        listadoProductos.push(dto);
      });
    listadoProductos.sort((a, b) => a.precioEfectivo - b.precioEfectivo);
    return pagination(skip, take, listadoProductos);
  }
}
