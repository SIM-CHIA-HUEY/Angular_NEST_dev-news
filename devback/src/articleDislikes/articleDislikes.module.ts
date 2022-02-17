import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleDislikesController } from './articleDislikes.controller';
import { ArticleDislikesService } from './articleDislikes.service';
import { ArticleDislikes } from "./articleDislikes.entity"; 
import { ArticleLikesModule } from 'src/articleLikes/articleLikes.module';

@Module({

  imports: [TypeOrmModule.forFeature([ArticleDislikes]), forwardRef(() => ArticleLikesModule)],
  controllers: [ArticleDislikesController],
  providers: [ArticleDislikesService],
  exports: [ArticleDislikesService]
})
export class ArticleDislikesModule { }