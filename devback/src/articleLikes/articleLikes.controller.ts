import { Controller, Get, Post, Patch, Delete, Param, Body, HttpStatus } from '@nestjs/common';
import { ArticleLikesService } from "./articleLikes.service";
import { ArticleDislikesService } from "../articleDislikes/articleDislikes.service";
import { CreateArticleLikesDto } from '../dto/create-articleLikes.dto';
import { UpdateArticleLikesDto } from "../dto/update-articleLikes.dto";  

@Controller('articleLikes')
export class ArticleLikesController {
    constructor(public ArticleLikesService: ArticleLikesService, public ArticleDislikesService: ArticleDislikesService) { }

    @Get()
    findAllArticleLikes() {
        return this.ArticleLikesService.findAll();
    }

    @Get('/count/:articleId')
    async countLikesArticle(@Param('articleId') articleId: number) {
        const data =  await this.ArticleLikesService.countLikesOneArticle(articleId);
        return {
          statusCode: HttpStatus.OK,
          message: 'number of likes',
          data,
        };
    }

    @Post()
    async createArticleLikes(@Body() createArticleLikesDto: CreateArticleLikesDto) {
        const existLike = await this.ArticleLikesService.exists(createArticleLikesDto.articleId,createArticleLikesDto.userId)
        const existDislike = await this.ArticleDislikesService.exists(createArticleLikesDto.articleId,createArticleLikesDto.userId)
        if(existLike != false){
            const data = await this.ArticleLikesService.remove(existLike);
            return {
                statusCode: HttpStatus.OK,
                message: 'Article like deleted successfully',
                id : existDislike,
                createArticleLikesDto
            };
        } else {
             if(existDislike != false){
                const data = await this.ArticleDislikesService.remove(existDislike);
            }
            const data = await this.ArticleLikesService.create(createArticleLikesDto);
            return {
                statusCode: HttpStatus.OK,
                message: 'article like added successfully',
                data,
            };
        }
    }

    @Get(':id')
    async findOneUser(@Param('id') id: number) {
        const data =  await this.ArticleLikesService.read(id);
        return {
          statusCode: HttpStatus.OK,
          message: 'Article like fetched successfully',
          data,
        };
    }

    @Patch(':id')
    async updateArticleLikes(@Param('id') id: number, @Body() updateArticleLikesDto: UpdateArticleLikesDto) {
        await this.ArticleLikesService.update(id, updateArticleLikesDto);
        return {
                    statusCode: HttpStatus.OK,
                    message: 'Article like updated successfully',
                };
    }

    @Delete(':id')
    async removeArticleLikes(@Param('id') id: number) {
        await this.ArticleLikesService.remove(id);
        return {
            statusCode: HttpStatus.OK,
            message: 'Article deleted successfully',
        };
    }

    @Get('/user/:idUser/article/:idArticle')
    async findExistUserLike(@Param('idUser') idUser: number, @Param('idArticle') idArticle: number) {
        const res = await this.ArticleLikesService.exists(idArticle, idUser);
        return {
            statusCode: HttpStatus.OK,
            message: "false if doesn't exist, id of the entry if exists",
            res,
        };
    }
}