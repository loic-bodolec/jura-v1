import { gql } from '@apollo/client';

export const SIGNIN = gql`
  mutation Signin($credentials: Credentials!) {
    signin(credentials: $credentials)
  }
`;
