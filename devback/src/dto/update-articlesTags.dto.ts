import { PartialType } from '@nestjs/mapped-types';
import { CreateArticlesTagsDto } from "./create-articlesTags.dto";

export class UpdateArticlesTagsDto extends PartialType(CreateArticlesTagsDto) {
    
    readonly id: number;
    readonly articleId: number;
    readonly tagId: number;
    
}