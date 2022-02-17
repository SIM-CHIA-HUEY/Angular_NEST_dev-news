import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne} from 'typeorm';
import { Articles } from 'src/articles/articles.entity';

@Entity()
export class ArticlesTags {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  articleId: number;

  // @ManyToOne(() => Articles, idArticle => idArticle.id, { onDelete: "CASCADE" })
  // @JoinColumn({name: "article_id"})   
  // idArticle: Articles;

  @Column()
  tagId: number;  

}
