import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { Comments } from './comments.entity';
import { CreateCommentsDto } from "../dto/create-comments.dto";

@Injectable()
export class CommentsService {

    constructor(
        @InjectRepository(Comments)
        private commentsRepository: Repository<Comments>,
    ) {}

    async create(data: CreateCommentsDto) {
        const user = this.commentsRepository.create(data);
        await this.commentsRepository.save(data);
        return user;
      }

    async findAll(): Promise<Comments[]> {
        return await this.commentsRepository.find();
    }

    async countCommentsOneArticle(articleId: number) {
      let count = await getConnection() 
      .createQueryBuilder()
      .select("count(comments.id)", "count")
      .from(Comments, "comments")
      .where("comments.articleId = " + articleId)
      .getRawMany()

      return count
    }

    async getCommentsOneArticle(_articleId: number) {
      return await this.commentsRepository.find({ where: { articleId: _articleId } });
    }

    async read(id: number) {
        return await this.commentsRepository.findOne({ where: { id: id } });
      }

    async remove(id: number) {
        await this.commentsRepository.delete( { id });
        return { deleted: true };
    }

    async update(id: number, data: Comments) {
        await this.commentsRepository.update({ id }, data);
        return await this.commentsRepository.findOne({ id });
    }

    async findByArticleId(articleId: number): Promise<Comments | undefined> {
      const commentFind = await this.commentsRepository.findOne({ articleId: articleId });
      return commentFind;
    }



}