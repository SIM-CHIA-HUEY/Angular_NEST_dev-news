import { PartialType } from '@nestjs/mapped-types';
import { Timestamp } from 'typeorm';
import { CreateArticlesDto } from "./create-articles.dto";

export class UpdateArticlesDto extends PartialType(CreateArticlesDto) {
    
    readonly id: number;
    readonly articleTitle: string;
    readonly articleSynopsis: string;
    readonly isValidated: boolean;
    readonly file: string;
    readonly location: string;
    readonly date: String;
    readonly userId: number;
    
}