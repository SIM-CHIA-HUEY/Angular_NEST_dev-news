import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { CreateUsersDto } from "../dto/create-users.dto";

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
    ) {}

    async create(data: CreateUsersDto) {
        const user = this.usersRepository.create(data);
        await this.usersRepository.save(data);
        return user;
      }

    async findAll(): Promise<Users[]> {
        return await this.usersRepository.find();
    }

    async read(id: number) {
        return await this.usersRepository.findOne({ where: { id: id } });
      }

    async findGoogle(id: number) {
      return await this.usersRepository.findOne({ where: { idGoogle: id } });
    }

    async findGithub(id: number) {
      return await this.usersRepository.findOne({ where: { idGithub: id } });
    }

    async remove(id: number) {
        await this.usersRepository.delete( { id });
        return { deleted: true };
    }

    async update(id: number, data: Users) {
        await this.usersRepository.update({ id }, data);
        return await this.usersRepository.findOne({ id });
    }

    async findByEmail(email: string): Promise<Users | undefined> {
      const userFind = await this.usersRepository.findOne({ email: email });
      return userFind;
    }

    async findOne(username: string): Promise<Users | undefined> {
      return this.usersRepository.findOne({username:username});
    }

    async findNewsletter(): Promise<Users[]> {
      return await this.usersRepository.find({ where: { isSubscribdedNewsletter: true } });
  }

}