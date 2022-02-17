import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentsDto } from "./create-comments.dto";

export class UpdateCommentsDto extends PartialType(CreateCommentsDto) {
    
    readonly id: number;
    readonly commentContent: string;
    readonly articleId: number;
    readonly userId: number;
    readonly dateOfComment: Date;
    readonly parentId: number;
    
}