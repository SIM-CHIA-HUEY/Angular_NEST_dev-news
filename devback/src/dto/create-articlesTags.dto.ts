import { Articles } from 'src/articles/articles.entity';

export class CreateArticlesTagsDto {

    readonly id: number;
    readonly articleId: number;
    readonly tagId: number;

};