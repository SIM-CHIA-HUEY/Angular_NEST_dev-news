import { Transform } from 'class-transformer';
import moment from 'moment';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Timestamp} from 'typeorm';

@Entity()
export class Articles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  articleTitle: string;

  @Column()
  articleSynopsis: string;

  @Column({default : false})
  isValidated: boolean;

  @Column()
  file: string;

  @Column()
  location: string;

  @Column({ type: 'date' })
  date: String;

  @Column()
  userId: number;
  static id: any;
}
