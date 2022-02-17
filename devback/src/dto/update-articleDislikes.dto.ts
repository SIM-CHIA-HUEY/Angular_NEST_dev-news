import { PartialType } from '@nestjs/mapped-types';
import { CreateArticleDislikesDto } from "./create-articleDislikes.dto";

export class UpdateArticleDislikesDto extends PartialType(CreateArticleDislikesDto) {
    
    readonly id: number;
    readonly articleId: number;
    readonly userId: number;
    
}