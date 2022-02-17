import { Controller, Get, Post, Patch, Delete, Param, Body, HttpStatus } from '@nestjs/common';
import { tagUsersService } from "./tagUsers.service";
import { CreateTagUsersDto } from '../dto/create-tagUsers.dto';
import { UpdateTagUsersDto } from '../dto/update-tagUsers.dto';  

@Controller('tagUsers')
export class tagUsersController {
    constructor(public tagUsersService: tagUsersService) { }

    @Get()
    findAlltagUsers() {
        return this.tagUsersService.findAll();
    }

    @Post()
    createtagUsers(@Body() createtagUsersDto: CreateTagUsersDto) {
        return this.tagUsersService.create(createtagUsersDto);
    }

    @Get(':id')
    async findOneUser(@Param('id') id: number) {
        const data =  await this.tagUsersService.read(id);
        return {
          statusCode: HttpStatus.OK,
          message: 'User fetched successfully',
          data,
        };
    }

    @Patch(':id')
    async updatetagUsers(@Param('id') id: number, @Body() updatetagUsersDto: UpdateTagUsersDto) {
        await this.tagUsersService.update(id, updatetagUsersDto);
        return {
                    statusCode: HttpStatus.OK,
                    message: 'User updated successfully',
                };
    }

    @Delete(':id')
    async removetagUsers(@Param('id') id: number) {
        await this.tagUsersService.remove(id);
        return {
            statusCode: HttpStatus.OK,
            message: 'User deleted successfully',
        };
    }
}