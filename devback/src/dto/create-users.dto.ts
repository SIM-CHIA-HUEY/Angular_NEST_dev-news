export class CreateUsersDto {

    readonly id: number;
    readonly username: string;
    readonly email: string;
    readonly password: string;
    readonly isAdmin: boolean;
    readonly isModo: boolean;
    readonly isSubscribdedNewsletter: boolean;
    readonly avatar: String;
     
    readonly idGoogle: string;
    readonly idGithub: string;

};