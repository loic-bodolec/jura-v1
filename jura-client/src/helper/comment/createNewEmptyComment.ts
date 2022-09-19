import { CreateCommentInput } from '../../services/api/generated/graphql';

export const createNewEmptyComment = (): CreateCommentInput => {
  return {
    text: ''
  };
};

export const hasAllFields = (newComment: CreateCommentInput): boolean => {
  const commentArray = Object.values(newComment);
  return commentArray.every((v) => v);
};
