import { PartialType } from '@nestjs/mapped-types';
import { CreateFavoritesDto } from "./create-favorites.dto";

export class UpdateFavoritesDto extends PartialType(CreateFavoritesDto) {
    
    readonly id: number;
    readonly articleId: number;
    readonly userId: number;
    
}