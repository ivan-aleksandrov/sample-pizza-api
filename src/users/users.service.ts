import { Injectable } from '@nestjs/common';
import { usersMockData } from '../mock-data/users.mock-data';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  private readonly users = usersMockData; // mocked instead of DB

  async findOne(username: string): Promise<UserDto | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
