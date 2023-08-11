import {
  Entity,
  Column,
  PrimaryColumn,
  Double,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("Dolar")
export class Dolar {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("float")
  precioDolar: number;
}
