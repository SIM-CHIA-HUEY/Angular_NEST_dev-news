import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { ArticleLikes } from './articleLikes.entity';
import { CreateArticleLikesDto } from '../dto/create-articleLikes.dto';

@Injectable()
export class ArticleLikesService {

    constructor(
        @InjectRepository(ArticleLikes)
        private articleLikesRepository: Repository<ArticleLikes>,
    ) {}

    async create(data: CreateArticleLikesDto) {
        const user = this.articleLikesRepository.create(data);
        await this.articleLikesRepository.save(data);
        return user;
      }

    async findAll(): Promise<ArticleLikes[]> {
        return await this.articleLikesRepository.find();
    }

    async read(id: number) {
        return await this.articleLikesRepository.findOne({ where: { id: id } });
      }

    async countLikesOneArticle(articleId: number) {
        let count = await getConnection() 
        .createQueryBuilder()
        .select("count(article_likes.id)", "count")
        .from(ArticleLikes, "article_likes")
        .where("article_likes.articleId = " + articleId)
        .getRawMany()
        return count
    }

    async remove(id: number) {
        await this.articleLikesRepository.delete( { id });
        return { deleted: true };
    }

    async update(id: number, data: ArticleLikes) {
        await this.articleLikesRepository.update({ id }, data);
        return await this.articleLikesRepository.findOne({ id });
    }

    async exists(_articleId: number, _userId: number) {
        const res = await this.articleLikesRepository.find({ where: { articleId: _articleId, userId: _userId } });
        if (res.length === 0 ){
            return false
        } else {
            return res[0].id
        }
    }


}