import { Repository } from "typeorm";
import { Producto } from "./entities/producto.entity";
export declare class ProductosService {
    private readonly productoRepository;
    constructor(productoRepository: Repository<Producto>);
    findAll(): Promise<any[]>;
    findByKeyWord(keywords: String[]): Promise<any[]>;
    findByCategory(param1: string): Promise<any[]>;
}
