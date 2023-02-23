import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DolaresModule } from 'src/dolar/dolar.module';
import { Producto } from './entities/producto.entity';
import { ProductosController } from './producto.controller';
import { ProductosService } from './producto.service';

@Module({
  imports: [DolaresModule,TypeOrmModule.forFeature([Producto])],
  controllers: [ProductosController],
  providers: [ProductosService],
})
export class ProductosModule {}
