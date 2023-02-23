import { ProductosService } from "./producto.service";
export declare class ProductosController {
    private readonly productosService;
    constructor(productosService: ProductosService);
    findAll(): Promise<any[]>;
    findByKeyWord(keywords: String[]): Promise<any[]>;
    findByCategory(param1: string): Promise<any[]>;
}
