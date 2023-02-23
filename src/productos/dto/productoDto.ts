import { Double } from 'typeorm';

export class ProductoDto {
  proveedor: string;

  producto: string;

  categoria: string;

  precioEfectivo: Double;

  precioTarjeta: Double;

  Cuota: Double;
}
