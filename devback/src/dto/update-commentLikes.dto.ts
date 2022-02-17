import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentLikesDto } from "./create-commentLikes.dto";

export class UpdateCommentLikesDto extends PartialType(CreateCommentLikesDto) {
    
    readonly id: number;
    readonly commentId: number;
    readonly userId: number;
    
}