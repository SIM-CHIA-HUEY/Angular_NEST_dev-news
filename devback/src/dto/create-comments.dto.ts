export class CreateCommentsDto {

    readonly id: number;
    readonly commentContent: string;
    readonly articleId: number;
    readonly userId: number;
    readonly dateOfComment: Date;
    readonly parentId: number;

};