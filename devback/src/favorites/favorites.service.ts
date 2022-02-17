import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorites } from './favorites.entity';
import { CreateFavoritesDto } from '../dto/create-favorites.dto';
import {getConnection} from "typeorm"; 
import { Articles } from 'src/articles/articles.entity';

@Injectable()
export class FavoritesService {

    constructor(
        @InjectRepository(Favorites)
        private FavoritesRepository: Repository<Favorites>,
    ) {}

    async create(data: CreateFavoritesDto) {
        const tag = this.FavoritesRepository.create(data);
        await this.FavoritesRepository.save(data);
        return tag;
      }

    async findAll(): Promise<Favorites[]> {
        return await this.FavoritesRepository.find();
    }

    async read(id: number) {
        return await this.FavoritesRepository.findOne({ where: { id: id } });
      }

    async remove(id: number) {
        await this.FavoritesRepository.delete( { id });
        return { deleted: true };
    }

    async update(id: number, data: Favorites) {
        await this.FavoritesRepository.update({ id }, data);
        return await this.FavoritesRepository.findOne({ id });
    }

    async findAllUserFavorites(userId: number) {

        let favorites = await getConnection() 
        .createQueryBuilder()
        .select("articles.id", "id")
        .addSelect ("articles.articleTitle", "articleTitle")
        .addSelect ("articles.articleSynopsis", "articleSynopsis")
        .addSelect ("articles.isValidated", "isValidated")
        .addSelect ("articles.userId", "userId")
        .addSelect ("articles.file", "file")
        .addSelect ("articles.date", "date")
        .addSelect ("articles.location", "location")
        .from(Articles, "articles")
        .innerJoin(Favorites, 'favorites', 'favorites.articleId = articles.Id')
        .where("favorites.userId = " +userId)
        .getRawMany()
  
        return favorites
    }

    async exists(_articleId: number, _userId: number) {
        const res = await this.FavoritesRepository.find({ where: { articleId: _articleId, userId: _userId } });
        if (res.length === 0 ){
            return false
        } else {
            return res[0].id
        }
    }



}