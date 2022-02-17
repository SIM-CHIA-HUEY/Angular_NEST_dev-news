import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleLikesController } from './articleLikes.controller';
import { ArticleLikesService } from './articleLikes.service';
import { ArticleLikes } from "./articleLikes.entity"; 
import { ArticleDislikesModule } from 'src/articleDislikes/articleDislikes.module';

@Module({

  imports: [TypeOrmModule.forFeature([ArticleLikes]),forwardRef(() =>ArticleDislikesModule)],
  controllers: [ArticleLikesController],
  providers: [ArticleLikesService],
  exports: [ArticleLikesService]
})
export class ArticleLikesModule { }