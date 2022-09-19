import { gql } from '@apollo/client';

export const GET_ONE_COMMENT = gql`
  query GetOneComment($getOneCommentId: String!) {
    getOneComment(id: $getOneCommentId) {
      id
      text
      created_date
      updated_date
      user {
        id
        firstname
        lastname
        job_title
        email
      }
      ticket {
        id
        status
        priority
        description
        title
      }
    }
  }
`;

export const GET_ALL_COMMENTS_BY_TICKET = gql`
  query GetAllCommentsByTicket($getAllCommentsByTicketId: String!) {
    getAllCommentsByTicket(id: $getAllCommentsByTicketId) {
      id
      ticket {
        id
      }
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
