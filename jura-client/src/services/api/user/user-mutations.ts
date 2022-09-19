import { gql } from '@apollo/client';

export const REGISTER = gql`
  mutation RegisterUser($userInput: RegisterUserInput!) {
    registerUser(userInput: $userInput) {
      firstname
      lastname
      job_title
      email
      password
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($userInput: UpdateUserInput!) {
    updateUser(userInput: $userInput) {
      id
      firstname
      lastname
      job_title
      email
    }
  }
`;

export const UPDATE_PASSWORD = gql`
  mutation UpdatePassword($password: String!, $updatePasswordId: String!) {
    updatePassword(password: $password, id: $updatePasswordId)
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($deleteUserId: String!) {
    deleteUser(id: $deleteUserId)
  }
`;
