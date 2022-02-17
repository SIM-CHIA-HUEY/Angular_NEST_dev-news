import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne} from 'typeorm';

@Entity()
export class CommentDislikes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  commentId: number;

  // @ManyToOne(() => Comments, idComment => idComment.id, { onDelete: "CASCADE" })
  // @JoinColumn({name: "comment_id"})   
  // idComment: Comments;

  @Column()
  userId: number;  

}
