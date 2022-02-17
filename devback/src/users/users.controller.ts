import { Controller, Get, Post, Patch, Delete, Param, Body, HttpStatus } from '@nestjs/common';
import { UsersService } from "./users.service";
import { CreateUsersDto } from "../dto/create-users.dto";
import { UpdateUsersDto } from "../dto/update-users.dto";  

@Controller('users')
export class UsersController {
    constructor(public UsersService: UsersService) { }

    @Get()
    findAllUsers() {
        return this.UsersService.findAll();
    }

    @Post()
    createUsers(@Body() createUsersDto: CreateUsersDto) {
        return this.UsersService.create(createUsersDto);
    }

    @Get(':id')
    async findOneUser(@Param('id') id: number) {
        const data =  await this.UsersService.read(id);
        return {
          statusCode: HttpStatus.OK,
          message: 'User fetched successfully',
          data,
        };
    }

    @Get('/google/:idGoogle')
    async findWithGoogle(@Param('idGoogle') idGoogle: number) {
        const data =  await this.UsersService.findGoogle(idGoogle);
        return {
          statusCode: HttpStatus.OK,
          message: 'User fetched successfully',
          data,
        };
    }

    @Get('/Github/:idGithub')
    async findWithGithub(@Param('idGithub') idGithub: number) {
        const data =  await this.UsersService.findGithub(idGithub);
        return {
          statusCode: HttpStatus.OK,
          message: 'User fetched successfully',
          data,
        };
    }

    @Patch(':id')
    async updateUsers(@Param('id') id: number, @Body() updateUsersDto: UpdateUsersDto) {
        await this.UsersService.update(id, updateUsersDto);
        return {
                    statusCode: HttpStatus.OK,
                    message: 'User updated successfully',
                };
    }

    @Delete(':id')
    async removeUsers(@Param('id') id: number) {
        await this.UsersService.remove(id);
        return {
            statusCode: HttpStatus.OK,
            message: 'User deleted successfully',
        };
    }
}