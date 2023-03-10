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
exports.ProductosController = void 0;
const common_1 = require("@nestjs/common");
const producto_service_1 = require("./producto.service");
let ProductosController = class ProductosController {
    constructor(productosService) {
        this.productosService = productosService;
    }
    async findAll() {
        return this.productosService.findAll();
    }
    findByKeyWord(keywords) {
        return this.productosService.findByKeyWord(keywords);
    }
    findByCategory(category) {
        return this.productosService.findByCategory(category);
    }
    findByKeyWordAndCategory(category, keywords) {
        return this.productosService.findByKeyWordAndCategory(keywords, category);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("/buscarPorPalabrasClaves/"),
    __param(0, (0, common_1.Query)("keywords", new common_1.ParseArrayPipe({ items: String, separator: "," }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], ProductosController.prototype, "findByKeyWord", null);
__decorate([
    (0, common_1.Get)("categoria/"),
    __param(0, (0, common_1.Query)("category")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductosController.prototype, "findByCategory", null);
__decorate([
    (0, common_1.Get)("palabrasClavesYCategoria/"),
    __param(0, (0, common_1.Query)("category")),
    __param(1, (0, common_1.Query)("keywords", new common_1.ParseArrayPipe({ items: String, separator: "," }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", void 0)
], ProductosController.prototype, "findByKeyWordAndCategory", null);
ProductosController = __decorate([
    (0, common_1.Controller)("productos"),
    __metadata("design:paramtypes", [producto_service_1.ProductosService])
], ProductosController);
exports.ProductosController = ProductosController;
//# sourceMappingURL=producto.controller.js.map