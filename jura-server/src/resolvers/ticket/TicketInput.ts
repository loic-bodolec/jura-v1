import { MaxLength } from 'class-validator';
import { Field, ID, InputType, Int } from 'type-graphql';
import Ticket from '../../dataLayer/entities/Ticket';

@InputType()
export class CreateTicketInput implements Partial<Ticket> {
  @Field(() => String)
  @MaxLength(255)
  status!: string;

  @Field(() => String)
  @MaxLength(255)
  priority!: string;

  @Field(() => String)
  @MaxLength(255)
  title!: string;

  @Field(() => String)
  @MaxLength(500)
  description?: string;

  @Field(() => Int)
  estimated_time!: number;

  @Field(() => Int)
  spent_time!: number;

  @Field(() => Date)
  due_date!: Date;
}

@InputType()
export class UpdateTicketInput implements Partial<Ticket> {
  @Field(() => ID)
  id!: string;

  @Field(() => String, { nullable: true })
  @MaxLength(255)
  status?: string;

  @Field(() => String, { nullable: true })
  @MaxLength(255)
  priority?: string;

  @Field(() => String, { nullable: true })
  @MaxLength(255)
  title?: string;

  @Field(() => String, { nullable: true })
  @MaxLength(500)
  description?: string;

  @Field(() => Int, { nullable: true })
  estimated_time?: number;

  @Field(() => Int, { nullable: true })
  spent_time?: number;

  @Field(() => Date, { nullable: true })
  due_date?: Date;
}
