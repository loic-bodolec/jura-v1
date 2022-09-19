import { gql } from '@apollo/client';

export const USER_ID_FIELD = gql`
  fragment UserIdField on User {
    id
  }
`;

export const GET_ALL_PROJECTS = gql`
  ${USER_ID_FIELD}
  query GetAllProjects {
    getAllProjects {
      id
      name
      status
      description
      created_at
      delivered_at
      due_at
      members {
        ...UserIdField
      }
    }
  }
`;

export const GET_ONE_PROJECT = gql`
  query GetOneProject($getOneProjectId: String!) {
    getOneProject(id: $getOneProjectId) {
      id
      name
      status
      description
      created_at
      delivered_at
      due_at
      members {
        id
        firstname
        lastname
      }
      owner {
        id
        firstname
        lastname
      }
    }
  }
`;

export const GET_ALL_PROJECTS_DELIVERY_DATE = gql`
  query GetAllProjectsDeliveryDate {
    getAllProjects {
      delivered_at
    }
  }
`;
