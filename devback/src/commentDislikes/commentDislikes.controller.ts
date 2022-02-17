import { Controller, Get, Post, Patch, Delete, Param, Body, HttpStatus } from '@nestjs/common';
import { CommentDislikesService } from "./commentDislikes.service";
import { CommentLikesService } from "../commentLikes/commentLikes.service";
import { CreateCommentDislikesDto } from '../dto/create-commentDislikes.dto';
import { UpdateCommentDislikesDto } from '../dto/update-commentDislikes.dto';  

@Controller('commentDislikes')
export class CommentDislikesController {
    constructor(public CommentDislikesService: CommentDislikesService, public CommentLikesService: CommentLikesService) { }

    @Get()
    findAllCommentDislikes() {
        return this.CommentDislikesService.findAll();
    }

    @Get('/count/:commentId')
    async countDislikesComment(@Param('commentId') commentId: number) {
        const data =  await this.CommentDislikesService.countDislikesOneComment(commentId);
        return {
          statusCode: HttpStatus.OK,
          message: 'number of dislikes',
          data,
        };
    }

    @Post()
    async createCommentDislikes(@Body() createCommentDislikesDto: CreateCommentDislikesDto) {
        const existLike = await this.CommentLikesService.exists(createCommentDislikesDto.commentId,createCommentDislikesDto.userId)
        const existDislike = await this.CommentDislikesService.exists(createCommentDislikesDto.commentId,createCommentDislikesDto.userId)
        if(existDislike != false){
            const data = await this.CommentDislikesService.remove(existDislike);
            return {
                statusCode: HttpStatus.OK,
                message: 'Comment dislike deleted successfully',
                id : existDislike,
                createCommentDislikesDto
            };
        } else {
             if(existLike != false){
                const data = await this.CommentLikesService.remove(existLike);
            }
            const data = await this.CommentDislikesService.create(createCommentDislikesDto);
            return {
                statusCode: HttpStatus.OK,
                message: 'Comment like added successfully',
                data,
            };
        }
    }

    @Get(':id')
    async findOneUser(@Param('id') id: number) {
        const data =  await this.CommentDislikesService.read(id);
        return {
          statusCode: HttpStatus.OK,
          message: 'User fetched successfully',
          data,
        };
    }

    @Patch(':id')
    async updateCommentDislikes(@Param('id') id: number, @Body() updateCommentDislikesDto: UpdateCommentDislikesDto) {
        await this.CommentDislikesService.update(id, updateCommentDislikesDto);
        return {
                    statusCode: HttpStatus.OK,
                    message: 'User updated successfully',
                };
    }

    @Delete(':id')
    async removeCommentDislikes(@Param('id') id: number) {
        await this.CommentDislikesService.remove(id);
        return {
            statusCode: HttpStatus.OK,
            message: 'User deleted successfully',
        };
    }

    @Get('/user/:idUser/comment/:idComment')
    async findExistUserLike(@Param('idUser') idUser: number, @Param('idComment') idComment: number) {
        const res = await this.CommentDislikesService.exists(idComment, idUser);
        return {
            statusCode: HttpStatus.OK,
            message: "false if doesn't exist, id of the entry if exists",
            res,
        };
    }
}