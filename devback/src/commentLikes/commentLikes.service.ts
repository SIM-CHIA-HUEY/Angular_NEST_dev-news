import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { CommentLikes } from './commentLikes.entity';
import { CreateCommentLikesDto } from '../dto/create-commentLikes.dto';

@Injectable()
export class CommentLikesService {

    constructor(
        @InjectRepository(CommentLikes)
        private commentLikesRepository: Repository<CommentLikes>,
    ) {}

    async create(data: CreateCommentLikesDto) {
        const user = this.commentLikesRepository.create(data);
        await this.commentLikesRepository.save(data);
        return user;
      }

    async findAll(): Promise<CommentLikes[]> {
        return await this.commentLikesRepository.find();
    }

    async countLikesOneComment(commentId: number) {
        let count = await getConnection() 
        .createQueryBuilder()
        .select("count(comment_likes.id)", "count")
        .from(CommentLikes, "comment_likes")
        .where("comment_likes.commentId = " + commentId)
        .getRawMany()
        return count
    }

    async read(id: number) {
        return await this.commentLikesRepository.findOne({ where: { id: id } });
      }

    async remove(id: number) {
        await this.commentLikesRepository.delete( { id });
        return { deleted: true };
    }

    async update(id: number, data: CommentLikes) {
        await this.commentLikesRepository.update({ id }, data);
        return await this.commentLikesRepository.findOne({ id });
    }

    async exists(_commentId: number, _userId: number) {
        const res = await this.commentLikesRepository.find({ where: { commentId: _commentId, userId: _userId } });
        if (res.length === 0 ){
            return false
        } else {
            return res[0].id
        }
    }


}