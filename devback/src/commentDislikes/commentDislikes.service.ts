import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { CommentDislikes } from './commentDislikes.entity';
import { CreateCommentDislikesDto } from '../dto/create-commentDislikes.dto';

@Injectable()
export class CommentDislikesService {

    constructor(
        @InjectRepository(CommentDislikes)
        private commentDislikesRepository: Repository<CommentDislikes>,
    ) {}

    async create(data: CreateCommentDislikesDto) {
        const user = this.commentDislikesRepository.create(data);
        await this.commentDislikesRepository.save(data);
        return user;
      }

    async findAll(): Promise<CommentDislikes[]> {
        return await this.commentDislikesRepository.find();
    }

    async countDislikesOneComment(commentId: number) {
        let count = await getConnection() 
        .createQueryBuilder()
        .select("count(comment_dislikes.id)", "count")
        .from(CommentDislikes, "comment_dislikes")
        .where("comment_dislikes.commentId = " + commentId)
        .getRawMany()
        return count
    }

    async read(id: number) {
        return await this.commentDislikesRepository.findOne({ where: { id: id } });
      }

    async remove(id: number) {
        await this.commentDislikesRepository.delete( { id });
        return { deleted: true };
    }

    async update(id: number, data: CommentDislikes) {
        await this.commentDislikesRepository.update({ id }, data);
        return await this.commentDislikesRepository.findOne({ id });
    }

    async exists(_commentId: number, _userId: number) {
        const res = await this.commentDislikesRepository.find({ where: { commentId: _commentId, userId: _userId } });
        if (res.length === 0 ){
            return false
        } else {
            return res[0].id
        }
    }


}