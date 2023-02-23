"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductosModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const dolar_module_1 = require("../dolar/dolar.module");
const producto_entity_1 = require("./entities/producto.entity");
const producto_controller_1 = require("./producto.controller");
const producto_service_1 = require("./producto.service");
let ProductosModule = class ProductosModule {
};
ProductosModule = __decorate([
    (0, common_1.Module)({
        imports: [dolar_module_1.DolaresModule, typeorm_1.TypeOrmModule.forFeature([producto_entity_1.Producto])],
        controllers: [producto_controller_1.ProductosController],
        providers: [producto_service_1.ProductosService],
    })
], ProductosModule);
exports.ProductosModule = ProductosModule;
//# sourceMappingURL=producto.module.js.map