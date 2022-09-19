import { MaxLength } from 'class-validator';
import { Field, ID, InputType } from 'type-graphql';
import Project, { ProjectStatus } from '../../dataLayer/entities/Project';

@InputType()
export class CreateProjectInput implements Partial<Project> {
  @Field(() => String)
  @MaxLength(255)
  name!: string;

  @Field(() => String)
  @MaxLength(255)
  status!: ProjectStatus;

  @Field(() => String, { nullable: true })
  @MaxLength(500)
  description?: string;

  @Field(() => Date, { nullable: true })
  due_at?: Date;
}

@InputType()
export class UpdateProjectInput extends CreateProjectInput {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  @MaxLength(255)
  name!: string;

  @Field(() => String)
  @MaxLength(255)
  status!: ProjectStatus;

  @Field(() => String, { nullable: true })
  @MaxLength(500)
  description?: string;

  @Field(() => Date, { nullable: true })
  due_at?: Date;

  @Field(() => Date, { nullable: true })
  delivered_at?: Date;
}
