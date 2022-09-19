import Comment from '../../../dataLayer/entities/Comment';

export interface ICommentService {
  getAll: () => Promise<Comment[]>;
  getOne: (id: string) => Promise<Comment>;
  create: (comment: { text: string }, userId: string, ticketId: string) => Promise<Comment>;
  update: (
    comment: { text: string; id: string },
    userId: string,
    ticketId: string,
  ) => Promise<Comment>;
  delete: (id: string) => Promise<void>;
}
