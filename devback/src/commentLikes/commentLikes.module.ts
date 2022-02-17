import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentLikesController } from './commentLikes.controller';
import { CommentLikesService } from './commentLikes.service';
import { CommentLikes } from "./commentLikes.entity"; 
import { CommentDislikesModule } from 'src/commentDislikes/commentDislikes.module';

@Module({

  imports: [TypeOrmModule.forFeature([CommentLikes]),forwardRef(() => CommentDislikesModule)],
  controllers: [CommentLikesController],
  providers: [CommentLikesService],
  exports: [CommentLikesService]
})
export class CommentLikesModule { }