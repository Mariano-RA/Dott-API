/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, Repository } from "typeorm";
import { Cuota } from "./entities/cuota.entity";

@Injectable()
export class CuotasService {
  constructor(
    @InjectRepository(Cuota)
    private readonly cuotaRepository: Repository<Cuota>
  ) {}

  async obtenerValorCuotas() {
    let tipoCuotas: Cuota[] = [];
    const resDolar = await this.cuotaRepository.query(
      "select id, valorTarjeta from Cuotas"
    );
    resDolar.forEach((tipoCuota) => {
      let cuota = new Cuota();
      cuota.id = tipoCuota.id;
      cuota.valorTarjeta = tipoCuota.valorTarjeta;
      tipoCuotas.push(cuota);
    });
    return tipoCuotas;
  }
}
