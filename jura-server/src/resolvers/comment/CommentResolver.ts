/* eslint-disable @typescript-eslint/indent */
import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql';
import { ICommentController } from '../../core/interfaces/controllers/ICommentController';
import Comment from '../../dataLayer/entities/Comment';
import { CommentService } from '../../domain/services/comment/CommentService';
import { CreateCommentInput, UpdateCommentInput } from './CommentInput';

@Resolver(Comment)
export class CommentResolver implements ICommentController {
  private service: CommentService = new CommentService();

  @Authorized()
  @Query(() => [Comment])
  async getAllComments(): Promise<Comment[]> {
    const results = await this.service.getAll();
    return results;
  }

  @Authorized()
  @Query(() => Comment)
  async getOneComment(@Arg('id') id: string): Promise<Comment> {
    const result = await this.service.getOne(id);
    return result;
  }

  @Authorized()
  @Query(() => [Comment])
  async getAllCommentsByTicket(@Arg('id') id: string): Promise<Comment[]> {
    const result = await this.service.getAllByTicket(id);
    return result;
  }

  @Authorized()
  @Mutation(() => Comment)
  async createComment(
    @Arg('commentInput') comment: CreateCommentInput,
    @Arg('userId') id: string,
    @Arg('ticketId') ticketId: string,
  ): Promise<Comment> {
    const result = await this.service.create(comment, id, ticketId);
    return result;
  }

  @Authorized()
  @Mutation(() => Comment)
  async updateComment(@Arg('commentInput') comment: UpdateCommentInput): Promise<Comment> {
    const result = await this.service.update(comment);
    return result;
  }

  @Authorized()
  @Mutation(() => Boolean)
  async deleteComment(@Arg('id') id: string): Promise<boolean> {
    await this.service.delete(id);
    return true;
  }
}
