import { gql } from '@apollo/client';

export const CREATE_TICKET = gql`
  mutation CreateTicket($membersIds: [String!]!, $projectId: String!, $ticket: CreateTicketInput!) {
    createTicket(membersIds: $membersIds, projectId: $projectId, ticket: $ticket) {
      status
      priority
      title
      description
      due_date
      project {
        id
        name
      }
    }
  }
`;

export const UPDATE_TICKET = gql`
  mutation UpdateTicket($ticketInput: UpdateTicketInput!) {
    updateTicket(ticketInput: $ticketInput) {
      id
      status
      priority
      title
      description
      due_date
      estimated_time
      spent_time
    }
  }
`;

export const UPDATE_USERS_FROM_TICKET = gql`
  mutation UpdateUsersFromTicket($userId: String!, $updateUsersFromTicketId: String!) {
    updateUsersFromTicket(userId: $userId, id: $updateUsersFromTicketId) {
      id
    }
  }
`;

export const DELETE_TICKET = gql`
  mutation DeleteTicket($deleteTicketId: String!) {
    deleteTicket(id: $deleteTicketId)
  }
`;
