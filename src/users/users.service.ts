import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: "admin",
      password: "1234",
    },
    {
      userId: 2,
      username: "user",
      password: "1234",
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async createUser(username: string, password: string): Promise<void> {
    let user = {
      userId: Math.floor(Math.random() * 999),
      username: username,
      password: password,
    };
    await this.users.push(user);
  }
}
