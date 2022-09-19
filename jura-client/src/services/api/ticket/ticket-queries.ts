import { gql } from '@apollo/client';

export const GET_ALL_TICKETS = gql`
  query GetAllTickets {
    getAllTickets {
      id
      status
      priority
      title
      description
      due_date
      created_at
      created_by {
        id
        firstname
        lastname
      }
      project {
        id
        name
      }
    }
  }
`;

export const GET_ALL_TICKETS_BY_PROJECT = gql`
  query GetAllTicketsByProject($getAllTicketsByProjectId: String!) {
    getAllTicketsByProject(id: $getAllTicketsByProjectId) {
      id
      status
      priority
      description
      title
      due_date
      estimated_time
      created_at
      created_by {
        id
        firstname
        lastname
      }
      project {
        id
        name
      }
      users {
        id
        firstname
        lastname
      }
    }
  }
`;

export const GET_ONE_TICKET = gql`
  query GetOneTicket($getOneTicketId: String!) {
    getOneTicket(id: $getOneTicketId) {
      id
      status
      priority
      title
      description
      due_date
      estimated_time
      created_at
      spent_time
      created_by {
        id
        firstname
        lastname
      }
      project {
        name
      }
      users {
        id
        firstname
        lastname
      }
    }
  }
`;
