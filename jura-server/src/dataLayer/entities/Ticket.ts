import { Field, ID, Int, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Project from './Project';
import User from './User';

@ObjectType()
@Entity()
export default class Ticket extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: string;

  @Field(() => String)
  @Column()
  status!: string;

  @Field(() => String)
  @Column()
  priority!: string;

  @Field(() => String, { nullable: true })
  @Column({ length: 500 })
  description?: string;

  @Field(() => String)
  @Column()
  title!: string;

  @Field(() => Date)
  @Column({ type: 'datetime' })
  due_date!: Date;

  @Field(() => Int)
  @Column({ default: 0 })
  estimated_time!: number;

  @Field(() => Date)
  @CreateDateColumn({ type: 'datetime' })
  created_at!: Date;

  @Field(() => Int, { nullable: true })
  @Column({ default: 0 })
  spent_time?: number;

  @ManyToOne(() => Project)
  @Field(() => Project)
  project!: Promise<Project>;

  @ManyToOne(() => User)
  @Field(() => User)
  created_by!: Promise<User>;

  @ManyToMany(() => User, (user) => user.tickets)
  @JoinTable()
  @Field(() => [User])
  users!: Promise<Array<User>>;
}
