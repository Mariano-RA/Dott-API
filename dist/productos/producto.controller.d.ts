import { ProductosService } from "./producto.service";
export declare class ProductosController {
    private readonly productosService;
    constructor(productosService: ProductosService);
    findAll(): Promise<any[]>;
    findByKeyWord(keywords: String[]): Promise<any[]>;
    findByCategory(category: string): Promise<any[]>;
    findByKeyWordAndCategory(category: string, keywords: String[]): Promise<any[]>;
}
