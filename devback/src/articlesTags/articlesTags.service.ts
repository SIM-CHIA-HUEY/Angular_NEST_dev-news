import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Articles } from 'src/articles/articles.entity';
import { ArticlesTags } from './articlesTags.entity';
import { CreateArticlesTagsDto } from '../dto/create-articlesTags.dto';
import { getConnection } from "typeorm";
import { Tags } from 'src/tags/tags.entity';

@Injectable()
export class ArticlesTagsService {

    constructor(
        @InjectRepository(ArticlesTags)
        private articlesTagsRepository: Repository<ArticlesTags>,
    ) { }

    async create(data: CreateArticlesTagsDto) {
        const user = this.articlesTagsRepository.create(data);
        await this.articlesTagsRepository.save(data);
        return user;
    }

    async findAll(): Promise<ArticlesTags[]> {
        return await this.articlesTagsRepository.find();
    }

    async read(id: number) {
        return await this.articlesTagsRepository.findOne({ where: { id: id } });
    }

    async remove(id: number) {
        await this.articlesTagsRepository.delete({ id });
        return { deleted: true };
    }

    async update(id: number, data: ArticlesTags) {
        await this.articlesTagsRepository.update({ id }, data);
        return await this.articlesTagsRepository.findOne({ id });
    }

    async findAllArticlesSelectedTags(whereString) {
        // return await this.articlesTagsRepository.find();
        const qb = this.articlesTagsRepository.createQueryBuilder("articles_tags");
        return await qb.select(["articleId"])
            .where('tagId IN ' + whereString)
    }

    async getAllTagsFromArticle() {

    }

    // async findByIdArticles(idArticle: Articles): Promise<ArticlesTags | undefined> {
    //   const articleTagFind = await this.articlesTagsRepository.findOne({ idArticle: idArticle });
    //   return articleTagFind;
    // }


    async findAllTagsArticles(articleId: number) {

        let articlesTags = await getConnection()
            .createQueryBuilder()
            .select("tags.tagTitle", "tagTitle")
            .from(Tags, "tags")
            .innerJoin(ArticlesTags, 'articlesTags', 'articlesTags.tagId = tags.id')
            .where("articlesTags.articleId =" + articleId)
            .getRawMany()

        return articlesTags
    }




}