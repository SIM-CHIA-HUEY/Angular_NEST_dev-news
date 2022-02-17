import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tags } from './tags.entity';
import { CreateTagsDto } from '../dto/create-tags.dto';

@Injectable()
export class TagsService {

    constructor(
        @InjectRepository(Tags)
        private tagsRepository: Repository<Tags>,
    ) {}

    async create(data: CreateTagsDto) {
        const tag = this.tagsRepository.create(data);
        await this.tagsRepository.save(data);
        return tag;
      }

    async findAll(): Promise<Tags[]> {
        return await this.tagsRepository.find();
    }

    async read(id: number) {
        return await this.tagsRepository.findOne({ where: { id: id } });
      }

    async remove(id: number) {
        await this.tagsRepository.delete( { id });
        return { deleted: true };
    }

    async update(id: number, data: Tags) {
        await this.tagsRepository.update({ id }, data);
        return await this.tagsRepository.findOne({ id });
    }

    async findByTitle(tagTitle: string): Promise<Tags | undefined> {
      const tagFind = await this.tagsRepository.findOne({ tagTitle: tagTitle });
      return tagFind;
    }



}