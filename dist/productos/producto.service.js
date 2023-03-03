"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const dolar_service_1 = require("../dolar/dolar.service");
const typeorm_2 = require("typeorm");
const productoDto_1 = require("./dto/productoDto");
const producto_entity_1 = require("./entities/producto.entity");
let ProductosService = class ProductosService {
    constructor(productoRepository) {
        this.productoRepository = productoRepository;
    }
    async findAll() {
        const productos = await this.productoRepository.find();
        const valorDolar = await this.dolaresService.obtenerUltimo();
        const listadoProductos = [];
        productos.forEach((prod) => {
            const dto = new productoDto_1.ProductoDto();
            dto.proveedor = prod.proveedor;
            dto.producto = prod.producto;
            dto.categoria = prod.categoria;
            dto.precioEfectivo =
                Math.round(prod.precio * valorDolar.precioDolar * 100) / 100;
            dto.precioTarjeta =
                Math.round(prod.precio * valorDolar.precioTarjeta * valorDolar.precioDolar * 100) / 100;
            dto.Cuota = Math.round((dto.precioTarjeta / 12) * 100) / 100;
            listadoProductos.push(dto);
        });
        return listadoProductos;
    }
    async findByKeyWord(keywords) {
        const productos = await this.productoRepository.find();
        const listadoProductos = [];
        const valorDolar = await this.dolaresService.obtenerUltimo();
        const palabra1 = keywords[0] != null ? keywords[0] : "";
        const palabra2 = keywords[1] != null ? keywords[1] : "";
        const palabra3 = keywords[2] != null ? keywords[2] : "";
        productos
            .filter((x) => x.producto.toLowerCase().includes(palabra1.toLowerCase()) &&
            x.producto.toLowerCase().includes(palabra2.toLowerCase()) &&
            x.producto.toLowerCase().includes(palabra3.toLowerCase()))
            .forEach((prod) => {
            const dto = new productoDto_1.ProductoDto();
            dto.proveedor = prod.proveedor;
            dto.producto = prod.producto;
            dto.categoria = prod.categoria;
            dto.precioEfectivo =
                Math.round(prod.precio * valorDolar.precioDolar * 100) / 100;
            dto.precioTarjeta =
                Math.round(prod.precio * valorDolar.precioTarjeta * valorDolar.precioDolar * 100) / 100;
            dto.Cuota =
                Math.round((dto.precioTarjeta / 12) * 100) / 100;
            listadoProductos.push(dto);
        });
        return listadoProductos;
    }
    async findByCategory(param1) {
        const productos = await this.productoRepository.find();
        const valorDolar = await this.dolaresService.obtenerUltimo();
        const listadoProductos = [];
        productos
            .filter((x) => x.categoria.toLowerCase().includes(param1.toLowerCase()))
            .forEach((prod) => {
            const dto = new productoDto_1.ProductoDto();
            dto.proveedor = prod.proveedor;
            dto.producto = prod.producto;
            dto.categoria = prod.categoria;
            dto.precioEfectivo =
                Math.round(prod.precio * valorDolar.precioDolar * 100) / 100;
            dto.precioTarjeta =
                Math.round(prod.precio * valorDolar.precioTarjeta * valorDolar.precioDolar * 100) / 100;
            dto.Cuota =
                Math.round((dto.precioTarjeta / 12) * 100) / 100;
            listadoProductos.push(dto);
        });
        return listadoProductos;
    }
};
__decorate([
    (0, common_1.Inject)(dolar_service_1.DolaresService),
    __metadata("design:type", dolar_service_1.DolaresService)
], ProductosService.prototype, "dolaresService", void 0);
ProductosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(producto_entity_1.Producto)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductosService);
exports.ProductosService = ProductosService;
//# sourceMappingURL=producto.service.js.map