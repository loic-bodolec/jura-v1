import { getConnection } from 'typeorm';
import CommentNotFoundException from '../../../core/exceptions/CommentNotFoundException';
import { UnexpectedException } from '../../../core/exceptions/UnexpectedException';
import { ICommentService } from '../../../core/interfaces/services/ICommentService';
import Comment from '../../../dataLayer/entities/Comment';
import { CommentRepository } from '../../../dataLayer/repositories/CommentRepository';
import { TicketRepository } from '../../../dataLayer/repositories/TicketRepository';
import { UserRepository } from '../../../dataLayer/repositories/UserRepository';

export class CommentService implements ICommentService {
  private repository = getConnection().getCustomRepository(CommentRepository);

  /**
   * Retrieve all the comments
   * @returns {Promise<Comment[]>} the comments
   */
  public async getAll(): Promise<Comment[]> {
    const results = await this.repository.find();
    return results;
  }

  /**
   * Retrieve one comment by id
   * @throws will throw an error if the comment is not found
   * @returns {Promise<Comment>} the comment
   */
  public async getOne(id: string): Promise<Comment> {
    const result = await this.repository.findOne({ id });
    if (!result) throw new CommentNotFoundException();
    return result;
  }

  public async getAllByTicket(id: string): Promise<Comment[]> {
    const result = await this.repository.find({ where: { ticket: id } });
    return result;
  }

  /**
   * Create a comment
   * @param {comment}
   * @returns {Promise<Comment>} the comment
   */
  public async create(
    comment: { text: string },
    userId: string,
    ticketId: string,
  ): Promise<Comment> {
    const userRepository = getConnection().getCustomRepository(UserRepository);
    const ticketRepository = getConnection().getCustomRepository(TicketRepository);

    const user = await userRepository.findOne(userId);
    const ticket = await ticketRepository.findOne(ticketId);

    const newComment = this.repository.create(comment);

    if (user) {
      newComment.user = Promise.resolve(user);
    }
    if (ticket) {
      newComment.ticket = Promise.resolve(ticket);
    }

    if (!user || !ticket) throw new UnexpectedException();

    const result = await this.repository.save(newComment);

    return result;
  }

  /**
   * Update a comment
   * @param {comment}
   * @throws will throw an error if the comment is not updated
   * @returns {Promise<Comment>} the comment
   */
  public async update(comment: { id: string; text: string }): Promise<Comment> {
    const result = await this.repository.update(comment.id, comment);
    if (!result.affected) throw new UnexpectedException();
    const updatedComment = await this.getOne(comment.id);
    return updatedComment;
  }

  /**
   * Delete a comment
   * @param {id} string the comment id
   * @throws will throw an error if the comment is not deleted
   * @returns {void}
   */
  public async delete(id: string): Promise<void> {
    const result = await this.repository.delete({ id });
    if (!result.affected) throw new UnexpectedException();
  }
}
