import { PartialType } from '@nestjs/mapped-types';
import { CreateTagUsersDto } from "./create-tagUsers.dto";

export class UpdateTagUsersDto extends PartialType(CreateTagUsersDto) {
    
    readonly id: number;
    readonly tagId: number;
    readonly userId: number;
    
}   