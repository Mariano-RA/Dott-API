import { Double } from 'typeorm';
export declare class ProductoDto {
    proveedor: string;
    producto: string;
    categoria: string;
    precioEfectivo: Double;
    precioTarjeta: Double;
    Cuota: Double;
}
