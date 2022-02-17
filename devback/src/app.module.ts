import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Articles } from './articles/articles.entity';
import { ArticlesModule } from './articles/articles.module';
import { ArticlesTags } from './articlesTags/articlesTags.entity';
import { ArticlesTagsModule } from './articlesTags/articlesTags.module';
import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';
import { Comments } from './comments/comments.entity';
import { Module } from '@nestjs/common';
import { TagsModule } from './tags/tags.module';
import { Tags } from './tags/tags.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { Users } from './users/users.entity';
import { ArticleDislikesModule } from './articleDislikes/articleDislikes.module';
import { ArticleLikesModule } from './articleLikes/articleLikes.module';
import { CommentDislikesModule } from './commentDislikes/commentDislikes.module';
import { CommentLikes } from './commentLikes/commentLikes.entity';
import { CommentLikesModule } from './commentLikes/commentLikes.module';
import { FavoritesModule } from './favorites/favorites.module';
import { tagUsersModule } from './tagUsers/tagUsers.module';
import { HttpModule } from '@nestjs/axios';
import { TwitterModule } from './twitter/twitter.module';
import { MailModule } from './mail/mail.module';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: 3306,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    autoLoadEntities: true,
    synchronize: false,
  }),
  // imports: [
  ArticlesModule,
  ArticlesTagsModule,
  TagsModule,
  UsersModule,
  AuthModule,
  CommentsModule,
  ArticleDislikesModule,
  ArticleLikesModule,
  CommentDislikesModule,
  CommentLikesModule,
  FavoritesModule,
  tagUsersModule,
  HttpModule,
  TwitterModule,
  MailModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
