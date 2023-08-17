import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DolaresModule } from "./dolar/dolar.module";
import { ProductosModule } from "./productos/producto.module";
import { Dolar } from "./dolar/entities/dolar.entity";
import { Producto } from "./productos/entities/producto.entity";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { Cuota } from "./cuota/entities/cuota.entity";
import { CuotasModule } from "./cuota/cuota.module";
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
@Module({
  imports: [
    ProductosModule,
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "./database/productosDB.sqlite",
      entities: [Dolar, Producto, Cuota],
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "client"),
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
