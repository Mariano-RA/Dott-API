import { Double } from 'typeorm';
export declare class Producto {
    id: number;
    proveedor: string;
    producto: string;
    categoria: string;
    precio: Double;
    precioEfectivo: Double;
    precioTarjeta: Double;
}
