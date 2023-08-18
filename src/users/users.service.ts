import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async findOne(email: string) {
    return this.userRepository.findOne({
      where: {
        email: email,
      },
    });
  }
  async findOneById(id: number) {
    return this.userRepository.findOneBy({
      id: id,
    });
  }

  async createUser(email: string, password: string) {
    try {
      const user = await this.userRepository.create({
        email: email,
        hash: password,
        hashedRt: null,
      });
      const createdUser = await this.userRepository.save(user);
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
