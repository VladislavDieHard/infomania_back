import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  getAllUsers(): Promise<User[]> {
    return this.userRepository.find()
  }

  getOneUserById(id: number): Promise<User> {
    return this.userRepository.findOne(id)
  }

  getOneUserByName(username: string): Promise<User> {
    return this.userRepository.findOne({ where: { username } })
  }

  async createUser(newUser: CreateUserDto): Promise<User> {
    const saltOrRounds = 10;
    const user: CreateUserDto = {
      username: newUser.username,
      password: await bcrypt.hash(newUser.password, saltOrRounds)
    }
    return this.userRepository.save(user)
  }
}
