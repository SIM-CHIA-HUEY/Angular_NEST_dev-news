import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { ArticleDislikes } from './articleDislikes.entity';
import { CreateArticleDislikesDto } from '../dto/create-articleDislikes.dto';

@Injectable()
export class ArticleDislikesService {

    constructor(
        @InjectRepository( ArticleDislikes)
        private articleDislikesRepository: Repository<ArticleDislikes>,
    ) {}

    async create(data: CreateArticleDislikesDto) {
        const user = this.articleDislikesRepository.create(data);
        await this.articleDislikesRepository.save(data);
        return user;
      }

    async findAll(): Promise<ArticleDislikes[]> {
        return await this.articleDislikesRepository.find();
    }

    async countDislikesOneArticle(articleId: number) {
        let count = await getConnection() 
        .createQueryBuilder()
        .select("count(article_dislikes.id)", "count")
        .from(ArticleDislikes, "article_dislikes")
        .where("article_dislikes.articleId = " + articleId)
        .getRawMany()
        return count
    }

    async read(id: number) {
        return await this.articleDislikesRepository.findOne({ where: { id: id } });
      }

    async remove(id: number) {
        await this.articleDislikesRepository.delete( { id });
        return { deleted: true };
    }

    async update(id: number, data: ArticleDislikes) {
        await this.articleDislikesRepository.update({ id }, data);
        return await this.articleDislikesRepository.findOne({ id });
    }

    async exists(_articleId: number, _userId: number) {
        const res = await this.articleDislikesRepository.find({ where: { articleId: _articleId, userId: _userId } });
        if (res.length === 0 ){
            return false
        } else {
            return res[0].id
        }
    }


}