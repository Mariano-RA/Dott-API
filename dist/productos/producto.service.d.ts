import { Repository } from "typeorm";
import { Producto } from "./entities/producto.entity";
export declare class ProductosService {
    private readonly productoRepository;
    private readonly dolaresService;
    constructor(productoRepository: Repository<Producto>);
    findAll(): Promise<any[]>;
    findByKeyWord(keywords: String[]): Promise<any[]>;
    findByCategory(category: string): Promise<any[]>;
    findByKeyWordAndCategory(keywords: String[], category: string): Promise<any[]>;
}
