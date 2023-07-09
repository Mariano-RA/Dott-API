import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DolaresModule } from "./dolar/dolar.module";
import { ProductosModule } from "./productos/producto.module";
import { Dolar } from "./dolar/entities/dolar.entity";
import { Producto } from "./productos/entities/producto.entity";

@Module({
  imports: [
    DolaresModule,
    ProductosModule,
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "./database/productosDB.sqlite",
      entities: [Dolar, Producto],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
