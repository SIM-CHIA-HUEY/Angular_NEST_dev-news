import { Controller, Get, Post, Patch, Delete, Param, Body, HttpStatus } from '@nestjs/common';
import { CommentsService } from "./comments.service";
import { CreateCommentsDto } from "../dto/create-comments.dto";
import { UpdateCommentsDto } from "../dto/update-comments.dto";  

@Controller('comments')
export class CommentsController {
    constructor(public CommentsService: CommentsService) { }

    @Get()
    findAllComments() {
        return this.CommentsService.findAll();
    }

    @Get('/count/:articleId')
    async countCommentsArticle(@Param('articleId') articleId: number) {
        const data =  await this.CommentsService.countCommentsOneArticle(articleId);
        return {
          statusCode: HttpStatus.OK,
          message: 'number of comments',
          data,
        };
    }

    @Get('/article/:articleId')
    async getCommentsArticle(@Param('articleId') articleId: number) {
        const data =  await this.CommentsService.getCommentsOneArticle(articleId);
        return {
          statusCode: HttpStatus.OK,
          message: 'list of comments',
          data,
        };
    }

    @Post()
    createComments(@Body() createCommentsDto: CreateCommentsDto) {
        return this.CommentsService.create(createCommentsDto);
    }

    @Get(':id')
    async findOneUser(@Param('id') id: number) {
        const data =  await this.CommentsService.read(id);
        return {
          statusCode: HttpStatus.OK,
          message: 'Comment fetched successfully',
          data,
        };
    }

    @Patch(':id')
    async updateComments(@Param('id') id: number, @Body() updateCommentsDto: UpdateCommentsDto) {
        await this.CommentsService.update(id, updateCommentsDto);
        return {
                    statusCode: HttpStatus.OK,
                    message: 'Comment updated successfully',
                };
    }

    @Delete(':id')
    async removeComments(@Param('id') id: number) {
        await this.CommentsService.remove(id);
        
        return {
            statusCode: HttpStatus.OK,
            message: 'Comment deleted successfully',
        };
    }
}