import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DolaresModule } from "./dolar/dolar.module";
import { ProductosModule } from "./productos/producto.module";

@Module({
  imports: [
    DolaresModule,
    ProductosModule,
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "./database/productosDB.sqlite",
      entities: [__dirname + "/**/*entity{.ts,.js}"],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
