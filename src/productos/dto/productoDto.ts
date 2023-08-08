import { Double } from "typeorm";
import { valorCuotaDto } from "./valorCuotaDto";

export class ProductoDto {
  proveedor: string;

  producto: string;

  categoria: string;

  precioEfectivo: Double;

  precioCuotas: valorCuotaDto[];
}
