import { type } from 'os';
import { ArticlesController } from 'src/articles/articles.controller';
import { Articles } from 'src/articles/articles.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne} from 'typeorm';

@Entity()
export class ArticleDislikes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  articleId: number;

  // @ManyToOne(type => Articles, idArticle => Articles.id, { onDelete: "CASCADE" })
  // @JoinColumn({name: "article_id"})   
  // idArticle: Articles;

  @Column()
  userId: number;  

}
