import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentDislikesDto } from "./create-commentDislikes.dto";

export class UpdateCommentDislikesDto extends PartialType(CreateCommentDislikesDto) {
    
    readonly id: number;
    readonly commentId: number;
    readonly userId: number;
    
}