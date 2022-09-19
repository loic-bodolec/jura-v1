import { Field, ID, ObjectType } from 'type-graphql';
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
import User from './User';

export enum ProjectStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
}

@ObjectType()
@Entity()
class Project extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: string;

  @Field(() => String)
  @Column()
  name!: string;

  @Field(() => String)
  @Column()
  status!: ProjectStatus;

  @Field(() => String, { nullable: true })
  @Column({ length: 500 })
  description?: string;

  @Field(() => Date)
  @CreateDateColumn({ type: 'datetime' })
  created_at!: Date;

  @Field(() => Date, { nullable: true })
  @Column({ type: 'datetime', nullable: true })
  delivered_at?: Date;

  @Field(() => Date, { nullable: true })
  @Column({ type: 'datetime', nullable: true })
  due_at?: Date;

  /**
   * Describe the many to many relationship
   * JoinTable is only needed on the owning side of of the relation
   * Cascade must be set to true to insert in the join table
   */
  @ManyToMany(() => User, (user) => user.projects, { cascade: true })
  @JoinTable()
  @Field(() => [User], { nullable: true })
  members?: Promise<Array<User>>;

  @ManyToOne(() => User, (user) => user.projects, { cascade: true })
  @Field(() => User, { nullable: true })
  owner?: Promise<User>;
}

export default Project;
