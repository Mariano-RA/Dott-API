import { Entity, Column, PrimaryColumn, Double } from "typeorm";

@Entity("Dolar")
export class Dolar {
  @PrimaryColumn("int")
  id: number;

  @Column("float")
  precioDolar: number;

  @Column("float")
  precioTarjeta: number;
}
