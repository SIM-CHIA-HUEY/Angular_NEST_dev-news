import { Controller, Get, Post, Patch, Delete, Param, Body, HttpStatus } from '@nestjs/common';
import { FavoritesService } from "./favorites.service";
import { CreateFavoritesDto } from '../dto/create-favorites.dto';
import { UpdateFavoritesDto } from '../dto/update-favorites.dto';  

@Controller('Favorites')
export class FavoritesController {
    constructor(public FavoritesService: FavoritesService) { }

    @Get()
    findAllFavorites() {
        return this.FavoritesService.findAll();
    }

    @Post()
    async createFavorites(@Body() createFavoritesDto: CreateFavoritesDto) {
        const exist = await this.FavoritesService.exists(createFavoritesDto.articleId,createFavoritesDto.userId)
        if( exist === false){
            const data = await this.FavoritesService.create(createFavoritesDto);
            return {
                statusCode: HttpStatus.OK,
                message: 'favorite added successfully',
                data,
              };
        } else {
            const data = await this.FavoritesService.remove(exist);
            return {
                statusCode: HttpStatus.OK,
                message: 'favorite deleted successfully',
                id : exist,
                createFavoritesDto
            };
        }
    }

    @Get(':id')
    async findOneUser(@Param('id') id: number) {
        const data =  await this.FavoritesService.read(id);
        return {
          statusCode: HttpStatus.OK,
          message: 'User fetched successfully',
          data,
        };
    }

    @Patch(':id')
    async updateFavorites(@Param('id') id: number, @Body() updateFavoritesDto: UpdateFavoritesDto) {
        await this.FavoritesService.update(id, updateFavoritesDto);
        return {
                    statusCode: HttpStatus.OK,
                    message: 'User updated successfully',
                };
    }

    @Delete(':id')
    async removeFavorites(@Param('id') id: number) {
        await this.FavoritesService.remove(id);
        return {
            statusCode: HttpStatus.OK,
            message: 'User deleted successfully',
        };
    }

    @Get('/user/:id')
    async findAllUserFavorites(@Param('id') id: number) {
        const res = await this.FavoritesService.findAllUserFavorites(id);
        return {
            statusCode: HttpStatus.OK,
            message: 'Favorites fetched successfully',
            res,
        };
    }

    @Get('/user/:idUser/article/:idArticle')
    async findExistUserFavorite(@Param('idUser') idUser: number, @Param('idArticle') idArticle: number) {
        const res = await this.FavoritesService.exists(idArticle, idUser);
        return {
            statusCode: HttpStatus.OK,
            message: "false if doesn't exist, id of the entry if exists",
            res,
        };
    }
}