import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticlesTagsController } from './articlesTags.controller';
import { ArticlesTagsService } from './articlesTags.service';
import { ArticlesTags } from "./articlesTags.entity"; 

@Module({

  imports: [TypeOrmModule.forFeature([ArticlesTags])],
  controllers: [ArticlesTagsController],
  providers: [ArticlesTagsService],
  exports: [ArticlesTagsService]
})
export class ArticlesTagsModule { }