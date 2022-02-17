import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne} from 'typeorm';

@Entity()
export class ArticleLikes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  articleId: number;

  // @ManyToOne(() => Articles, idArticle => idArticle.id, { onDelete: "CASCADE" })
  // @JoinColumn({name: "article_id"})   
  // idArticle: Articles;

  @Column()
  userId: number;  

}
