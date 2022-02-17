import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentDislikesController } from './commentDislikes.controller';
import { CommentDislikesService } from './commentDislikes.service';
import { CommentDislikes } from "./commentDislikes.entity"; 
import { CommentLikesModule } from 'src/commentLikes/commentLikes.module';

@Module({

  imports: [TypeOrmModule.forFeature([CommentDislikes]),forwardRef(() =>CommentLikesModule)],
  controllers: [CommentDislikesController],
  providers: [CommentDislikesService],
  exports: [CommentDislikesService]
})
export class CommentDislikesModule { }