import { MaxLength } from 'class-validator';
import { Field, ID, InputType } from 'type-graphql';
import Comment from '../../dataLayer/entities/Comment';

@InputType()
export class CreateCommentInput implements Partial<Comment> {
  @Field(() => String)
  @MaxLength(500)
  text!: string;
}

@InputType()
export class UpdateCommentInput implements Partial<Comment> {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  @MaxLength(500)
  text!: string;
}
