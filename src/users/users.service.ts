import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { AuthDto } from "src/auth/dto/auth.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async findOne(email: string) {
    return await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  async findOneById(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });

    return user;
  }

  async createUser(dto: AuthDto) {
    try {
      const { email, password } = dto;
      const createdUser = await this.userRepository.save({
        email: email,
        hash: password,
      });
      return createdUser;
    } catch (error) {
      return error;
    }
  }

  async updateUser(id: number, hash: string) {
    try {
      const user = await this.userRepository.findOneBy({
        id: id,
      });
      if (user != null) {
        const updatedUser = { ...user, hashedRt: hash };
        await this.userRepository.save(updatedUser);
      }
    } catch (error) {
      return error;
    }
  }
}
