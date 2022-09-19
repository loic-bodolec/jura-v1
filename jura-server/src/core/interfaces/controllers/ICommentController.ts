import Comment from '../../../dataLayer/entities/Comment';
import { CreateCommentInput, UpdateCommentInput } from '../../../resolvers/comment/CommentInput';

export interface ICommentController {
  getAllComments: () => Promise<Comment[]>;
  getOneComment: (id: string) => Promise<Comment>;
  createComment: (
    comment: CreateCommentInput,
    userId: string,
    ticketId: string,
  ) => Promise<Comment>;
  updateComment: (comment: UpdateCommentInput) => Promise<Comment>;
  deleteComment: (id: string) => Promise<boolean>;
}
