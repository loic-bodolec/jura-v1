import { IsEmail, MaxLength } from 'class-validator';
import { Field, ID, InputType } from 'type-graphql';
import User from '../../dataLayer/entities/User';

@InputType()
export class RegisterUserInput implements Partial<User> {
  @Field(() => String)
  @MaxLength(255)
  firstname!: string;

  @Field(() => String)
  @MaxLength(255)
  lastname!: string;

  @Field(() => String)
  @MaxLength(255)
  job_title!: string;

  @Field(() => String)
  @IsEmail()
  email!: string;

  @Field(() => String)
  @MaxLength(255)
  password!: string;
}

@InputType()
export class UpdateUserInput implements Partial<User> {
  @Field(() => ID)
  id!: string;

  @Field(() => String, { nullable: true })
  @MaxLength(255)
  firstname?: string;

  @Field(() => String, { nullable: true })
  @MaxLength(255)
  lastname?: string;

  @Field(() => String, { nullable: true })
  @MaxLength(255)
  job_title?: string;

  @Field(() => String, { nullable: true })
  @IsEmail()
  email?: string;

  @Field(() => String, { nullable: true })
  password?: string;
}
