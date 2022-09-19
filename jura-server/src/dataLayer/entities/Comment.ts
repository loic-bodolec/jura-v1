import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Ticket from './Ticket';
import User from './User';

@ObjectType()
@Entity()
class Comment extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: string;

  @Field(() => String)
  @Column({ length: 500 })
  text!: string;

  @Field(() => Date)
  @CreateDateColumn({ type: 'datetime' })
  created_date!: Date;

  @Field(() => Date)
  @UpdateDateColumn({ type: 'datetime' })
  updated_date!: Date;

  @ManyToOne(() => User)
  @Field(() => User)
  user!: Promise<User>;

  @ManyToOne(() => Ticket)
  @Field(() => Ticket)
  ticket!: Promise<Ticket>;
}

export default Comment;
