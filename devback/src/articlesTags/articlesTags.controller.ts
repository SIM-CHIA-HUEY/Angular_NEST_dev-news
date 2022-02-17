import { Controller, Get, Post, Patch, Delete, Param, Body, HttpStatus } from '@nestjs/common';
import { ArticlesTagsService } from "./articlesTags.service";
import { CreateArticlesTagsDto } from "../dto/create-articlesTags.dto";
import { UpdateArticlesTagsDto } from "../dto/update-articlesTags.dto";

@Controller('articlesTags')
export class ArticlesTagsController {
    constructor(public ArticlesTagsService: ArticlesTagsService) { }

    @Get()
    findAllArticlesTags() {
        return this.ArticlesTagsService.findAll();
    }

    @Get('/selectedTags')
    async findAllArticlesSelectedTags(@Body() list: any) {
        const listTags = list.TagList;
        var whereString: String = '';
        listTags.forEach(element => {
            whereString = whereString + element + ","
        });
        whereString = whereString.substring(0, whereString.length - 1)
        const data = await this.ArticlesTagsService.findAllArticlesSelectedTags(whereString);
        return {
            statusCode: HttpStatus.OK,
            message: 'Articles tag selected fetched successfully',
            data,
        };
    }

    @Post()
    createArticlesTags(@Body() createArticlesTagsDto: CreateArticlesTagsDto) {
        return this.ArticlesTagsService.create(createArticlesTagsDto);
    }

    @Get(':id')
    async findOneUser(@Param('id') id: number) {
        const data = await this.ArticlesTagsService.read(id);
        return {
            statusCode: HttpStatus.OK,
            message: 'Article tag fetched successfully',
            data,
        };
    }

    @Patch(':id')
    async updateArticlesTags(@Param('id') id: number, @Body() updateArticlesTagsDto: UpdateArticlesTagsDto) {
        await this.ArticlesTagsService.update(id, updateArticlesTagsDto);
        return {
            statusCode: HttpStatus.OK,
            message: 'User updated successfully',
        };
    }

    @Delete(':id')
    async removeArticlesTags(@Param('id') id: number) {
        await this.ArticlesTagsService.remove(id);
        return {
            statusCode: HttpStatus.OK,
            message: 'User deleted successfully',
        };
    }

    @Get('article/:articleId')
    async findAllTagsArticles(@Param('articleId') articleId: number) {
        const res = await this.ArticlesTagsService.findAllTagsArticles(articleId);
        let txt = '';
        res.forEach(elem => {
            txt = txt + elem.tagTitle + ", "
        })
        txt = txt.substring(0,txt.length-2);
        return {
            statusCode: HttpStatus.OK,
            message: 'List of all the tags for one article',
            txt,
        };
    }
}