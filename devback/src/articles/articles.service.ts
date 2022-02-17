import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Articles } from './articles.entity';
import { CreateArticlesDto } from '../dto/create-articles.dto';
import { ArticlesTags } from 'src/articlesTags/articlesTags.entity';
import { Tags } from 'src/tags/tags.entity';
import {getConnection} from "typeorm"; 

@Injectable()
export class ArticlesService {

    constructor(
        @InjectRepository(Articles)
        private articlesRepository: Repository<Articles>,
    ) {}

    async create(data: CreateArticlesDto) {
        const article = this.articlesRepository.create(data);
        const articleCreated = await this.articlesRepository.save(data);
        return articleCreated;
      }

    async findSearch(search) {
      const res = await getConnection() 
      .createQueryBuilder() 
      .select("articles.id", "id")
      .addSelect ("articles.articleTitle", "articleTitle")
      .addSelect ("articles.articleSynopsis", "articleSynopsis")
      .addSelect ("articles.isValidated", "isValidated")
      .addSelect ("articles.userId", "userId")
      .addSelect ("articles.file", "file")
      .addSelect ("articles.date", "date")
      .addSelect ("articles.location", "location")
      // .addSelect ("tags.id", "tagId")
      // .addSelect ("tags.tagTitle", "tagTitle")
      .from(Articles, "articles")
      .leftJoin (ArticlesTags, "articles_tags", "articles_tags.articleId=articles.id")
      .leftJoin (Tags, "tags", "tags.Id=articles_tags.tagId")
      .where("articles.articleTitle LIKE '%" + search + "%'")
      .orWhere("articles.articleSynopsis LIKE '%" + search + "%'")
      .orWhere("tags.tagTitle LIKE '%" + search + "%'")
      .groupBy("id")
      .addGroupBy("articleTitle")
      .addGroupBy("articleSynopsis")
      .addGroupBy("isValidated")
      .addGroupBy("userId")
      .addGroupBy("file")
      .addGroupBy("date")
      .addGroupBy("location")
      .getRawMany()
      return res
    }

    async findAll() {
      return await this.articlesRepository.find();
  }

    async read(id: number) {
        return await this.articlesRepository.findOne({ where: { id: id } });
      }

    async remove(id: number) {
        await this.articlesRepository.delete({ id });
        return { deleted: true };
    }

    async update(id: number, data: Articles) {
        await this.articlesRepository.update({ id }, data);
        return await this.articlesRepository.findOne({ id });
    }

    async findById(id: number): Promise<Articles | undefined> {
      const articleFind = await this.articlesRepository.findOne({ id: id });
      return articleFind;
    }

    async findAllUserArticles(userId: number) {

      let articles = await getConnection() 
      .getRepository(Articles)
      .createQueryBuilder("articles")
      .where("articles.userId = " + userId)
      .getMany();

      return articles
  }



}