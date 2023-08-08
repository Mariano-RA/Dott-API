import { Entity, Column, PrimaryColumn, Double } from "typeorm";

@Entity("Cuota")
export class Cuota {
  @PrimaryColumn("int")
  id: number;

  @Column("float")
  valorTarjeta: number;
}
