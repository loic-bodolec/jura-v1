import argon2 from 'argon2';
import { IsEmail } from 'class-validator';
import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Project from './Project';
import Ticket from './Ticket';

export enum Role {
  ADMIN = 0,
  USER = 1,
}

@ObjectType()
@Entity()
export default class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: string;

  @Field(() => String)
  @Column()
  firstname!: string;

  @Field(() => String)
  @Column()
  lastname!: string;

  @Field(() => String)
  @Column()
  job_title!: string;

  @Field(() => String)
  @Column({ unique: true })
  @IsEmail()
  email!: string;

  @Field(() => String)
  @Column()
  password!: string;

  @Field(() => Number)
  @Column({ default: 1 })
  role!: Role;

  @OneToMany(() => Project, (project) => project.owner)
  @Field(() => [Project])
  projects!: Promise<Array<Project>>;

  @ManyToMany(() => Ticket, (ticket) => ticket.users)
  @Field(() => [Ticket])
  tickets!: Promise<Array<Ticket>>;

  async hashPassword(): Promise<void> {
    this.password = await argon2.hash(this.password);
  }

  async verifyPassword(pwd: string): Promise<boolean> {
    const result = await argon2.verify(this.password, pwd);
    return result;
  }
}
