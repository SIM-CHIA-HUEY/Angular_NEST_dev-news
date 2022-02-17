import { PartialType } from '@nestjs/mapped-types';
import { CreateArticleLikesDto } from "./create-articleLikes.dto";

export class UpdateArticleLikesDto extends PartialType(CreateArticleLikesDto) {
    
    readonly id: number;
    readonly articleId: number;
    readonly userId: number;
    
}