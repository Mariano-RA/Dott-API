/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DolarDto } from "./dto/dolarDto";
import { Dolar } from "./entities/dolar.entity";

@Injectable()
export class DolaresService {
  constructor(
    @InjectRepository(Dolar)
    private readonly dolarRepository: Repository<Dolar>
  ) {}

  async obtenerUltimo(){
    const valorDolar = await this.dolarRepository.query(
      "select id, precioDolar, precioTarjeta from Dolares order by id desc LIMIT 1"
    );
    return valorDolar;
  }

  async agregarValor(dolarDto: DolarDto) {
    try {
      await this.dolarRepository.save({precioDolar: dolarDto.precioDolar, precioTarjeta: dolarDto.precioTarjeta});
      return "Se creo el registro correctamente";
    } catch (error) {
      return error;
    }
  }
}
