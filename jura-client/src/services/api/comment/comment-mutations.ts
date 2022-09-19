import { gql } from '@apollo/client';

export const CREATE_COMMENT = gql`
  mutation CreateComment($ticketId: String!, $userId: String!, $commentInput: CreateCommentInput!) {
    createComment(ticketId: $ticketId, userId: $userId, commentInput: $commentInput) {
      id
      text
      created_date
      user {
        id
        firstname
        lastname
      }
    }
  }
`;

export const UPDATE_COMMENT = gql`
  mutation UpdateComment($commentInput: UpdateCommentInput!) {
    updateComment(commentInput: $commentInput) {
      id
      text
      created_date
      updated_date
      user {
        id
        firstname
        lastname
      }
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation DeleteComment($deleteCommentId: String!) {
    deleteComment(id: $deleteCommentId)
  }
`;
