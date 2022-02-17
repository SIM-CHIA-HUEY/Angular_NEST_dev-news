import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TagUsers } from './tagUsers.entity';
import { CreateTagUsersDto } from '../dto/create-tagUsers.dto';

@Injectable()
export class tagUsersService {

    constructor(
        @InjectRepository(TagUsers)
        private tagUsersRepository: Repository<TagUsers>,
    ) {}

    async create(data: CreateTagUsersDto) {
        const tag = this.tagUsersRepository.create(data);
        await this.tagUsersRepository.save(data);
        return tag;
      }

    async findAll(): Promise<TagUsers[]> {
        return await this.tagUsersRepository.find();
    }

    async read(id: number) {
        return await this.tagUsersRepository.findOne({ where: { id: id } });
      }

    async remove(id: number) {
        await this.tagUsersRepository.delete( { id });
        return { deleted: true };
    }

    async update(id: number, data: TagUsers) {
        await this.tagUsersRepository.update({ id }, data);
        return await this.tagUsersRepository.findOne({ id });
    }

    // async findByTitle(tagTitle: string): Promise<TagUsers | undefined> {
    //   const tagFind = await this.tagUsersRepository.findOne({ tagTitle: tagTitle });
    //   return tagFind;
    // }



}