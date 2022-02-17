import { Controller, Get, Post, Patch, Delete, Param, Body, HttpStatus } from '@nestjs/common';
import { ArticleDislikesService } from "./articleDislikes.service";
import { ArticleLikesService } from "../articleLikes/articleLikes.service";
import { CreateArticleDislikesDto } from '../dto/create-articleDislikes.dto';
import { UpdateArticleDislikesDto } from '../dto/update-articleDislikes.dto'; 

@Controller('articleDislikes')
export class ArticleDislikesController {
    constructor(public ArticleDislikesService: ArticleDislikesService, public ArticleLikesService: ArticleLikesService) { }

    @Get()
    findAllArticleDislikes() {
        return this.ArticleDislikesService.findAll();
    }

    @Get('/count/:articleId')
    async countLikesArticle(@Param('articleId') articleId: number) {
        const data =  await this.ArticleDislikesService.countDislikesOneArticle(articleId);
        return {
          statusCode: HttpStatus.OK,
          message: 'number of dislikes',
          data,
        };
    }

    @Post()
    async createArticleDislikes(@Body() createArticleDislikesDto: CreateArticleDislikesDto) {
        const existLike = await this.ArticleLikesService.exists(createArticleDislikesDto.articleId,createArticleDislikesDto.userId)
        const existDislike = await this.ArticleDislikesService.exists(createArticleDislikesDto.articleId,createArticleDislikesDto.userId)
        if(existDislike != false){
            const data = await this.ArticleDislikesService.remove(existDislike);
            return {
                statusCode: HttpStatus.OK,
                message: 'Article dislike deleted successfully',
                id : existDislike,
                createArticleDislikesDto
            };
        } else {
             if(existLike != false){
                const data = await this.ArticleLikesService.remove(existLike);
            }
            const data = await this.ArticleDislikesService.create(createArticleDislikesDto);
            return {
                statusCode: HttpStatus.OK,
                message: 'article dislike added successfully',
                data,
            };
        }
    }

    @Get(':id')
    async findOneUser(@Param('id') id: number) {
        const data =  await this.ArticleDislikesService.read(id);
        return {
          statusCode: HttpStatus.OK,
          message: 'Article dislike fetched successfully',
          data,
        };
    }

    @Patch(':id')
    async updateArticleDislikes(@Param('id') id: number, @Body() updateArticleDislikesDto: UpdateArticleDislikesDto) {
        await this.ArticleDislikesService.update(id, updateArticleDislikesDto);
        return {
                    statusCode: HttpStatus.OK,
                    message: 'User updated successfully',
                };
    }

    @Delete(':id')
    async removeArticleDislikes(@Param('id') id: number) {
        await this.ArticleDislikesService.remove(id);
        return {
            statusCode: HttpStatus.OK,
            message: 'User deleted successfully',
        };
    }

    @Get('/user/:idUser/article/:idArticle')
    async findExistUserDislike(@Param('idUser') idUser: number, @Param('idArticle') idArticle: number) {
        const res = await this.ArticleDislikesService.exists(idArticle, idUser);
        return {
            statusCode: HttpStatus.OK,
            message: "false if doesn't exist, id of the entry if exists",
            res,
        };
    }
}