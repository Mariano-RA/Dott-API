import { Entity, Column, PrimaryColumn, Double } from 'typeorm';

@Entity('Productos')
export class Producto {
  @PrimaryColumn('int')
  id: number;

  @Column('text', { nullable: true })
  proveedor: string;

  @Column('text', { nullable: true })
  producto: string;

  @Column('text')
  categoria: string;

  @Column('float', { nullable: true })
  precio: Double;

  @Column('float', { nullable: true })
  precioEfectivo: Double;

  @Column('float', { nullable: true })
  precioTarjeta: Double;
}
