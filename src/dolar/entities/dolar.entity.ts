import { Entity, Column, PrimaryColumn, Double } from 'typeorm';

@Entity('Dolares')
export class Dolar {
  @PrimaryColumn('int')
  id: number;

  @Column('float')
  precioDolar: Double;

  @Column('float')
  precioTarjeta: Double;
}
