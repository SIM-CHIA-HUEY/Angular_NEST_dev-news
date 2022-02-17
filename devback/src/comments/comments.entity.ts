import { Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';

@Entity()
export class Comments {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  commentContent: string;

  @Column()
  articleId: number;

  @Column()
  userId: number;

  @Column({nullable: false, type: 'timestamp', default: 'CURRENT_TIMESTAMP'})
  dateOfComment: Date;

  @Column({
    nullable: true
  })
  parentId: number;


}
