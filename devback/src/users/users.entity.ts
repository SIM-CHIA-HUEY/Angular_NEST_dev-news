import { Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {Blob} from 'buffer';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({ default: true })
  isModo: boolean;

  @Column({ default: false })
  isSubscribdedNewsletter: boolean;

  @Column({ default: false })
  avatar: String;

  @Column()
  idGoogle: string

  @Column()
  idGithub: string
}
