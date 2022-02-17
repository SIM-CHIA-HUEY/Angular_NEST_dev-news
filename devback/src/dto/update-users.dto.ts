import { PartialType } from '@nestjs/mapped-types';
import { CreateUsersDto } from "./create-users.dto";

export class UpdateUsersDto extends PartialType(CreateUsersDto) {
    
    readonly id: number;
    readonly username: string;
    readonly email: string;
    readonly password: string;
    readonly isAdmin: boolean;
    readonly isModo: boolean;
    readonly isSubscribdedNewsletter: boolean;
    readonly avatar: string;
    readonly idGoogle: string;
    readonly idGithub: string;
    
}