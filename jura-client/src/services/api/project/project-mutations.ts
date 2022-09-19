import { gql } from '@apollo/client';

export const CREATE_PROJECT = gql`
  mutation CreateProject($projectInput: CreateProjectInput!, $membersIds: [String!]!, $ownerId: String!) {
    createProject(projectInput: $projectInput, membersIds: $membersIds, ownerId: $ownerId) {
      id
      name
    }
  }
`;

export const UPDATE_PROJECT = gql`
  mutation updateProject($projectInput: UpdateProjectInput!) {
    updateProject(projectInput: $projectInput) {
      id
      name
    }
  }
`;
