import { Timestamp } from "typeorm";

export class CreateArticlesDto {

    readonly id: number;
    readonly articleTitle: string;
    readonly articleSynopsis: string;
    readonly isValidated: boolean;
    readonly file: string;
    readonly location: string;
    readonly date: String;
    readonly userId: number;

};