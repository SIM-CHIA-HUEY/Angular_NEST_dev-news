import { Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';

@Entity()
export class TagUsers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tagId: number;

  @Column()
  userId: number;

}
