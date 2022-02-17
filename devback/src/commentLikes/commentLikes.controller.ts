import { Controller, Get, Post, Patch, Delete, Param, Body, HttpStatus } from '@nestjs/common';
import { CommentLikesService } from "./commentLikes.service";
import { CommentDislikesService } from "../commentDislikes/commentDislikes.service";
import { CreateCommentLikesDto } from '../dto/create-commentLikes.dto';
import { UpdateCommentLikesDto } from '../dto/update-commentLikes.dto';  

@Controller('commentLikes')
export class CommentLikesController {
    constructor(public CommentLikesService: CommentLikesService, public CommentDislikesService: CommentDislikesService) { }

    @Get()
    findAllCommentLikes() {
        return this.CommentLikesService.findAll();
    }

    @Get('/count/:commentId')
    async countLikesComment(@Param('commentId') commentId: number) {
        const data =  await this.CommentLikesService.countLikesOneComment(commentId);
        return {
          statusCode: HttpStatus.OK,
          message: 'number of dislikes',
          data,
        };
    }

    @Post()
    async createCommentLikes(@Body() createCommentLikesDto: CreateCommentLikesDto) {
        const existLike = await this.CommentLikesService.exists(createCommentLikesDto.commentId,createCommentLikesDto.userId)
        const existDislike = await this.CommentDislikesService.exists(createCommentLikesDto.commentId,createCommentLikesDto.userId)
        if (existLike != false) {
            const data = await this.CommentLikesService.remove(existLike);
            return {
                statusCode: HttpStatus.OK,
                message: 'Comment like deleted successfully',
                id : existLike,
                createCommentLikesDto
            };
        } else {
             if(existDislike != false){
                const data = await this.CommentDislikesService.remove(existDislike);
            }
            const data = await this.CommentLikesService.create(createCommentLikesDto);
            return {
                statusCode: HttpStatus.OK,
                message: 'Comment like added successfully',
                data,
            };
        }
    }

    @Get(':id')
    async findOneUser(@Param('id') id: number) {
        const data =  await this.CommentLikesService.read(id);
        return {
          statusCode: HttpStatus.OK,
          message: 'User fetched successfully',
          data,
        };
    }

    @Patch(':id')
    async updateCommentLikes(@Param('id') id: number, @Body() updateCommentLikesDto: UpdateCommentLikesDto) {
        await this.CommentLikesService.update(id, updateCommentLikesDto);
        return {
                    statusCode: HttpStatus.OK,
                    message: 'User updated successfully',
                };
    }

    @Delete(':id')
    async removeCommentLikes(@Param('id') id: number) {
        await this.CommentLikesService.remove(id);
        return {
            statusCode: HttpStatus.OK,
            message: 'User deleted successfully',
        };
    }

    @Get('/user/:idUser/comment/:idComment')
    async findExistUserLike(@Param('idUser') idUser: number, @Param('idComment') idComment: number) {
        const res = await this.CommentLikesService.exists(idComment, idUser);
        return {
            statusCode: HttpStatus.OK,
            message: "false if doesn't exist, id of the entry if exists",
            res,
        };
    }
}