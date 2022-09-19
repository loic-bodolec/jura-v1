import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Comment = {
  __typename?: 'Comment';
  created_date: Scalars['DateTime'];
  id: Scalars['ID'];
  text: Scalars['String'];
  ticket: Ticket;
  updated_date: Scalars['DateTime'];
  user: User;
};

export type CreateCommentInput = {
  text: Scalars['String'];
};

export type CreateProjectInput = {
  description?: InputMaybe<Scalars['String']>;
  due_at?: InputMaybe<Scalars['DateTime']>;
  name: Scalars['String'];
  status: Scalars['String'];
};

export type CreateTicketInput = {
  description: Scalars['String'];
  due_date: Scalars['DateTime'];
  estimated_time: Scalars['Int'];
  priority: Scalars['String'];
  spent_time: Scalars['Int'];
  status: Scalars['String'];
  title: Scalars['String'];
};

export type Credentials = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment: Comment;
  createProject: Project;
  createTicket: Ticket;
  deleteComment: Scalars['Boolean'];
  deleteTicket: Scalars['Boolean'];
  deleteUser: Scalars['Boolean'];
  registerUser: User;
  signin: Scalars['String'];
  updateComment: Comment;
  updatePassword: Scalars['Boolean'];
  updateProject: Project;
  updateTicket: Ticket;
  updateUser: User;
  updateUsersFromProject: Project;
  updateUsersFromTicket: Ticket;
};


export type MutationCreateCommentArgs = {
  commentInput: CreateCommentInput;
  ticketId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationCreateProjectArgs = {
  membersIds: Array<Scalars['String']>;
  ownerId: Scalars['String'];
  projectInput: CreateProjectInput;
};


export type MutationCreateTicketArgs = {
  membersIds: Array<Scalars['String']>;
  projectId: Scalars['String'];
  ticket: CreateTicketInput;
};


export type MutationDeleteCommentArgs = {
  id: Scalars['String'];
};


export type MutationDeleteTicketArgs = {
  id: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['String'];
};


export type MutationRegisterUserArgs = {
  userInput: RegisterUserInput;
};


export type MutationSigninArgs = {
  credentials: Credentials;
};


export type MutationUpdateCommentArgs = {
  commentInput: UpdateCommentInput;
};


export type MutationUpdatePasswordArgs = {
  id: Scalars['String'];
  password: Scalars['String'];
};


export type MutationUpdateProjectArgs = {
  projectInput: UpdateProjectInput;
};


export type MutationUpdateTicketArgs = {
  ticketInput: UpdateTicketInput;
};


export type MutationUpdateUserArgs = {
  userInput: UpdateUserInput;
};


export type MutationUpdateUsersFromProjectArgs = {
  id: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationUpdateUsersFromTicketArgs = {
  id: Scalars['String'];
  userId: Scalars['String'];
};

export type Project = {
  __typename?: 'Project';
  created_at: Scalars['DateTime'];
  delivered_at?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  due_at?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  members?: Maybe<Array<User>>;
  name: Scalars['String'];
  owner?: Maybe<User>;
  status: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getAllComments: Array<Comment>;
  getAllCommentsByTicket: Array<Comment>;
  getAllProjects: Array<Project>;
  getAllTickets: Array<Ticket>;
  getAllTicketsByProject: Array<Ticket>;
  getAllTicketsByUser: Array<Ticket>;
  getAllUsers: Array<User>;
  getOneComment: Comment;
  getOneProject: Project;
  getOneTicket: Ticket;
  getOneUser: User;
  getProfile: User;
};


export type QueryGetAllCommentsByTicketArgs = {
  id: Scalars['String'];
};


export type QueryGetAllTicketsByProjectArgs = {
  id: Scalars['String'];
};


export type QueryGetAllTicketsByUserArgs = {
  id: Scalars['String'];
};


export type QueryGetOneCommentArgs = {
  id: Scalars['String'];
};


export type QueryGetOneProjectArgs = {
  id: Scalars['String'];
};


export type QueryGetOneTicketArgs = {
  id: Scalars['String'];
};


export type QueryGetOneUserArgs = {
  id: Scalars['String'];
};

export type RegisterUserInput = {
  email: Scalars['String'];
  firstname: Scalars['String'];
  job_title: Scalars['String'];
  lastname: Scalars['String'];
  password: Scalars['String'];
};

export type Ticket = {
  __typename?: 'Ticket';
  created_at: Scalars['DateTime'];
  created_by: User;
  description?: Maybe<Scalars['String']>;
  due_date: Scalars['DateTime'];
  estimated_time: Scalars['Int'];
  id: Scalars['ID'];
  priority: Scalars['String'];
  project: Project;
  spent_time?: Maybe<Scalars['Int']>;
  status: Scalars['String'];
  title: Scalars['String'];
  users: Array<User>;
};

export type UpdateCommentInput = {
  id: Scalars['ID'];
  text: Scalars['String'];
};

export type UpdateProjectInput = {
  delivered_at?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  due_at?: InputMaybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  status: Scalars['String'];
};

export type UpdateTicketInput = {
  description?: InputMaybe<Scalars['String']>;
  due_date?: InputMaybe<Scalars['DateTime']>;
  estimated_time?: InputMaybe<Scalars['Int']>;
  id: Scalars['ID'];
  priority?: InputMaybe<Scalars['String']>;
  spent_time?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']>;
  firstname?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  job_title?: InputMaybe<Scalars['String']>;
  lastname?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  averageTimePerTicket: Scalars['Float'];
  email: Scalars['String'];
  firstname: Scalars['String'];
  id: Scalars['ID'];
  job_title: Scalars['String'];
  lastname: Scalars['String'];
  password: Scalars['String'];
  projects: Array<Project>;
  role: Scalars['Float'];
  tickets: Array<Ticket>;
};

export type SigninMutationVariables = Exact<{
  credentials: Credentials;
}>;


export type SigninMutation = { __typename?: 'Mutation', signin: string };

export type CreateCommentMutationVariables = Exact<{
  ticketId: Scalars['String'];
  userId: Scalars['String'];
  commentInput: CreateCommentInput;
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'Comment', id: string, text: string, created_date: any, user: { __typename?: 'User', id: string, firstname: string, lastname: string } } };

export type UpdateCommentMutationVariables = Exact<{
  commentInput: UpdateCommentInput;
}>;


export type UpdateCommentMutation = { __typename?: 'Mutation', updateComment: { __typename?: 'Comment', id: string, text: string, created_date: any, updated_date: any, user: { __typename?: 'User', id: string, firstname: string, lastname: string } } };

export type DeleteCommentMutationVariables = Exact<{
  deleteCommentId: Scalars['String'];
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment: boolean };

export type GetOneCommentQueryVariables = Exact<{
  getOneCommentId: Scalars['String'];
}>;


export type GetOneCommentQuery = { __typename?: 'Query', getOneComment: { __typename?: 'Comment', id: string, text: string, created_date: any, updated_date: any, user: { __typename?: 'User', id: string, firstname: string, lastname: string, job_title: string, email: string }, ticket: { __typename?: 'Ticket', id: string, status: string, priority: string, description?: string | null | undefined, title: string } } };

export type GetAllCommentsByTicketQueryVariables = Exact<{
  getAllCommentsByTicketId: Scalars['String'];
}>;


export type GetAllCommentsByTicketQuery = { __typename?: 'Query', getAllCommentsByTicket: Array<{ __typename?: 'Comment', id: string, text: string, created_date: any, updated_date: any, ticket: { __typename?: 'Ticket', id: string }, user: { __typename?: 'User', id: string, firstname: string, lastname: string } }> };

export type CreateProjectMutationVariables = Exact<{
  projectInput: CreateProjectInput;
  membersIds: Array<Scalars['String']> | Scalars['String'];
  ownerId: Scalars['String'];
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject: { __typename?: 'Project', id: string, name: string } };

export type UpdateProjectMutationVariables = Exact<{
  projectInput: UpdateProjectInput;
}>;


export type UpdateProjectMutation = { __typename?: 'Mutation', updateProject: { __typename?: 'Project', id: string, name: string } };

export type UserIdFieldFragment = { __typename?: 'User', id: string };

export type GetAllProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllProjectsQuery = { __typename?: 'Query', getAllProjects: Array<{ __typename?: 'Project', id: string, name: string, status: string, description?: string | null | undefined, created_at: any, delivered_at?: any | null | undefined, due_at?: any | null | undefined, members?: Array<{ __typename?: 'User', id: string }> | null | undefined }> };

export type GetOneProjectQueryVariables = Exact<{
  getOneProjectId: Scalars['String'];
}>;


export type GetOneProjectQuery = { __typename?: 'Query', getOneProject: { __typename?: 'Project', id: string, name: string, status: string, description?: string | null | undefined, created_at: any, delivered_at?: any | null | undefined, due_at?: any | null | undefined, members?: Array<{ __typename?: 'User', id: string, firstname: string, lastname: string }> | null | undefined, owner?: { __typename?: 'User', id: string, firstname: string, lastname: string } | null | undefined } };

export type GetAllProjectsDeliveryDateQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllProjectsDeliveryDateQuery = { __typename?: 'Query', getAllProjects: Array<{ __typename?: 'Project', delivered_at?: any | null | undefined }> };

export type CreateTicketMutationVariables = Exact<{
  membersIds: Array<Scalars['String']> | Scalars['String'];
  projectId: Scalars['String'];
  ticket: CreateTicketInput;
}>;


export type CreateTicketMutation = { __typename?: 'Mutation', createTicket: { __typename?: 'Ticket', status: string, priority: string, title: string, description?: string | null | undefined, due_date: any, project: { __typename?: 'Project', id: string, name: string } } };

export type UpdateTicketMutationVariables = Exact<{
  ticketInput: UpdateTicketInput;
}>;


export type UpdateTicketMutation = { __typename?: 'Mutation', updateTicket: { __typename?: 'Ticket', id: string, status: string, priority: string, title: string, description?: string | null | undefined, due_date: any, estimated_time: number, spent_time?: number | null | undefined } };

export type UpdateUsersFromTicketMutationVariables = Exact<{
  userId: Scalars['String'];
  updateUsersFromTicketId: Scalars['String'];
}>;


export type UpdateUsersFromTicketMutation = { __typename?: 'Mutation', updateUsersFromTicket: { __typename?: 'Ticket', id: string } };

export type DeleteTicketMutationVariables = Exact<{
  deleteTicketId: Scalars['String'];
}>;


export type DeleteTicketMutation = { __typename?: 'Mutation', deleteTicket: boolean };

export type GetAllTicketsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllTicketsQuery = { __typename?: 'Query', getAllTickets: Array<{ __typename?: 'Ticket', id: string, status: string, priority: string, title: string, description?: string | null | undefined, due_date: any, created_at: any, created_by: { __typename?: 'User', id: string, firstname: string, lastname: string }, project: { __typename?: 'Project', id: string, name: string } }> };

export type GetAllTicketsByProjectQueryVariables = Exact<{
  getAllTicketsByProjectId: Scalars['String'];
}>;


export type GetAllTicketsByProjectQuery = { __typename?: 'Query', getAllTicketsByProject: Array<{ __typename?: 'Ticket', id: string, status: string, priority: string, description?: string | null | undefined, title: string, due_date: any, estimated_time: number, created_at: any, created_by: { __typename?: 'User', id: string, firstname: string, lastname: string }, project: { __typename?: 'Project', id: string, name: string }, users: Array<{ __typename?: 'User', id: string, firstname: string, lastname: string }> }> };

export type GetOneTicketQueryVariables = Exact<{
  getOneTicketId: Scalars['String'];
}>;


export type GetOneTicketQuery = { __typename?: 'Query', getOneTicket: { __typename?: 'Ticket', id: string, status: string, priority: string, title: string, description?: string | null | undefined, due_date: any, estimated_time: number, created_at: any, spent_time?: number | null | undefined, created_by: { __typename?: 'User', id: string, firstname: string, lastname: string }, project: { __typename?: 'Project', name: string }, users: Array<{ __typename?: 'User', id: string, firstname: string, lastname: string }> } };

export type RegisterUserMutationVariables = Exact<{
  userInput: RegisterUserInput;
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', registerUser: { __typename?: 'User', firstname: string, lastname: string, job_title: string, email: string, password: string } };

export type UpdateUserMutationVariables = Exact<{
  userInput: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, firstname: string, lastname: string, job_title: string, email: string } };

export type UpdatePasswordMutationVariables = Exact<{
  password: Scalars['String'];
  updatePasswordId: Scalars['String'];
}>;


export type UpdatePasswordMutation = { __typename?: 'Mutation', updatePassword: boolean };

export type DeleteUserMutationVariables = Exact<{
  deleteUserId: Scalars['String'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: boolean };

export type GetProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProfileQuery = { __typename?: 'Query', getProfile: { __typename?: 'User', id: string, firstname: string, lastname: string, job_title: string, email: string, role: number, projects: Array<{ __typename?: 'Project', id: string, name: string, status: string, description?: string | null | undefined, created_at: any, delivered_at?: any | null | undefined, due_at?: any | null | undefined, members?: Array<{ __typename?: 'User', id: string }> | null | undefined }>, tickets: Array<{ __typename?: 'Ticket', id: string, status: string, priority: string, description?: string | null | undefined, title: string, due_date: any, estimated_time: number, created_at: any, spent_time?: number | null | undefined, created_by: { __typename?: 'User', id: string, firstname: string, lastname: string }, project: { __typename?: 'Project', id: string, name: string }, users: Array<{ __typename?: 'User', id: string, firstname: string, lastname: string }> }> } };

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = { __typename?: 'Query', getAllUsers: Array<{ __typename?: 'User', id: string, firstname: string, lastname: string, job_title: string, email: string, role: number }> };

export type GetOneUserQueryVariables = Exact<{
  getOneUserId: Scalars['String'];
}>;


export type GetOneUserQuery = { __typename?: 'Query', getOneUser: { __typename?: 'User', id: string, firstname: string, lastname: string, job_title: string, email: string, role: number, projects: Array<{ __typename?: 'Project', id: string, name: string, status: string, description?: string | null | undefined }>, tickets: Array<{ __typename?: 'Ticket', id: string, status: string, priority: string, description?: string | null | undefined, title: string, due_date: any, estimated_time: number, created_at: any, spent_time?: number | null | undefined, created_by: { __typename?: 'User', id: string, firstname: string, lastname: string }, project: { __typename?: 'Project', id: string, name: string }, users: Array<{ __typename?: 'User', id: string, firstname: string, lastname: string }> }> } };

export const UserIdFieldFragmentDoc = gql`
    fragment UserIdField on User {
  id
}
    `;
export const SigninDocument = gql`
    mutation Signin($credentials: Credentials!) {
  signin(credentials: $credentials)
}
    `;
export type SigninMutationFn = Apollo.MutationFunction<SigninMutation, SigninMutationVariables>;

/**
 * __useSigninMutation__
 *
 * To run a mutation, you first call `useSigninMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSigninMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signinMutation, { data, loading, error }] = useSigninMutation({
 *   variables: {
 *      credentials: // value for 'credentials'
 *   },
 * });
 */
export function useSigninMutation(baseOptions?: Apollo.MutationHookOptions<SigninMutation, SigninMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SigninMutation, SigninMutationVariables>(SigninDocument, options);
      }
export type SigninMutationHookResult = ReturnType<typeof useSigninMutation>;
export type SigninMutationResult = Apollo.MutationResult<SigninMutation>;
export type SigninMutationOptions = Apollo.BaseMutationOptions<SigninMutation, SigninMutationVariables>;
export const CreateCommentDocument = gql`
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
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      ticketId: // value for 'ticketId'
 *      userId: // value for 'userId'
 *      commentInput: // value for 'commentInput'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, options);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const UpdateCommentDocument = gql`
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
export type UpdateCommentMutationFn = Apollo.MutationFunction<UpdateCommentMutation, UpdateCommentMutationVariables>;

/**
 * __useUpdateCommentMutation__
 *
 * To run a mutation, you first call `useUpdateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCommentMutation, { data, loading, error }] = useUpdateCommentMutation({
 *   variables: {
 *      commentInput: // value for 'commentInput'
 *   },
 * });
 */
export function useUpdateCommentMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCommentMutation, UpdateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCommentMutation, UpdateCommentMutationVariables>(UpdateCommentDocument, options);
      }
export type UpdateCommentMutationHookResult = ReturnType<typeof useUpdateCommentMutation>;
export type UpdateCommentMutationResult = Apollo.MutationResult<UpdateCommentMutation>;
export type UpdateCommentMutationOptions = Apollo.BaseMutationOptions<UpdateCommentMutation, UpdateCommentMutationVariables>;
export const DeleteCommentDocument = gql`
    mutation DeleteComment($deleteCommentId: String!) {
  deleteComment(id: $deleteCommentId)
}
    `;
export type DeleteCommentMutationFn = Apollo.MutationFunction<DeleteCommentMutation, DeleteCommentMutationVariables>;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      deleteCommentId: // value for 'deleteCommentId'
 *   },
 * });
 */
export function useDeleteCommentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCommentMutation, DeleteCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument, options);
      }
export type DeleteCommentMutationHookResult = ReturnType<typeof useDeleteCommentMutation>;
export type DeleteCommentMutationResult = Apollo.MutationResult<DeleteCommentMutation>;
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<DeleteCommentMutation, DeleteCommentMutationVariables>;
export const GetOneCommentDocument = gql`
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

/**
 * __useGetOneCommentQuery__
 *
 * To run a query within a React component, call `useGetOneCommentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOneCommentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOneCommentQuery({
 *   variables: {
 *      getOneCommentId: // value for 'getOneCommentId'
 *   },
 * });
 */
export function useGetOneCommentQuery(baseOptions: Apollo.QueryHookOptions<GetOneCommentQuery, GetOneCommentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOneCommentQuery, GetOneCommentQueryVariables>(GetOneCommentDocument, options);
      }
export function useGetOneCommentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOneCommentQuery, GetOneCommentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOneCommentQuery, GetOneCommentQueryVariables>(GetOneCommentDocument, options);
        }
export type GetOneCommentQueryHookResult = ReturnType<typeof useGetOneCommentQuery>;
export type GetOneCommentLazyQueryHookResult = ReturnType<typeof useGetOneCommentLazyQuery>;
export type GetOneCommentQueryResult = Apollo.QueryResult<GetOneCommentQuery, GetOneCommentQueryVariables>;
export const GetAllCommentsByTicketDocument = gql`
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

/**
 * __useGetAllCommentsByTicketQuery__
 *
 * To run a query within a React component, call `useGetAllCommentsByTicketQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllCommentsByTicketQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllCommentsByTicketQuery({
 *   variables: {
 *      getAllCommentsByTicketId: // value for 'getAllCommentsByTicketId'
 *   },
 * });
 */
export function useGetAllCommentsByTicketQuery(baseOptions: Apollo.QueryHookOptions<GetAllCommentsByTicketQuery, GetAllCommentsByTicketQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllCommentsByTicketQuery, GetAllCommentsByTicketQueryVariables>(GetAllCommentsByTicketDocument, options);
      }
export function useGetAllCommentsByTicketLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllCommentsByTicketQuery, GetAllCommentsByTicketQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllCommentsByTicketQuery, GetAllCommentsByTicketQueryVariables>(GetAllCommentsByTicketDocument, options);
        }
export type GetAllCommentsByTicketQueryHookResult = ReturnType<typeof useGetAllCommentsByTicketQuery>;
export type GetAllCommentsByTicketLazyQueryHookResult = ReturnType<typeof useGetAllCommentsByTicketLazyQuery>;
export type GetAllCommentsByTicketQueryResult = Apollo.QueryResult<GetAllCommentsByTicketQuery, GetAllCommentsByTicketQueryVariables>;
export const CreateProjectDocument = gql`
    mutation CreateProject($projectInput: CreateProjectInput!, $membersIds: [String!]!, $ownerId: String!) {
  createProject(
    projectInput: $projectInput
    membersIds: $membersIds
    ownerId: $ownerId
  ) {
    id
    name
  }
}
    `;
export type CreateProjectMutationFn = Apollo.MutationFunction<CreateProjectMutation, CreateProjectMutationVariables>;

/**
 * __useCreateProjectMutation__
 *
 * To run a mutation, you first call `useCreateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMutation, { data, loading, error }] = useCreateProjectMutation({
 *   variables: {
 *      projectInput: // value for 'projectInput'
 *      membersIds: // value for 'membersIds'
 *      ownerId: // value for 'ownerId'
 *   },
 * });
 */
export function useCreateProjectMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectMutation, CreateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, options);
      }
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>;
export type CreateProjectMutationResult = Apollo.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = Apollo.BaseMutationOptions<CreateProjectMutation, CreateProjectMutationVariables>;
export const UpdateProjectDocument = gql`
    mutation updateProject($projectInput: UpdateProjectInput!) {
  updateProject(projectInput: $projectInput) {
    id
    name
  }
}
    `;
export type UpdateProjectMutationFn = Apollo.MutationFunction<UpdateProjectMutation, UpdateProjectMutationVariables>;

/**
 * __useUpdateProjectMutation__
 *
 * To run a mutation, you first call `useUpdateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectMutation, { data, loading, error }] = useUpdateProjectMutation({
 *   variables: {
 *      projectInput: // value for 'projectInput'
 *   },
 * });
 */
export function useUpdateProjectMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProjectMutation, UpdateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProjectMutation, UpdateProjectMutationVariables>(UpdateProjectDocument, options);
      }
export type UpdateProjectMutationHookResult = ReturnType<typeof useUpdateProjectMutation>;
export type UpdateProjectMutationResult = Apollo.MutationResult<UpdateProjectMutation>;
export type UpdateProjectMutationOptions = Apollo.BaseMutationOptions<UpdateProjectMutation, UpdateProjectMutationVariables>;
export const GetAllProjectsDocument = gql`
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
    ${UserIdFieldFragmentDoc}`;

/**
 * __useGetAllProjectsQuery__
 *
 * To run a query within a React component, call `useGetAllProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllProjectsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllProjectsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllProjectsQuery, GetAllProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllProjectsQuery, GetAllProjectsQueryVariables>(GetAllProjectsDocument, options);
      }
export function useGetAllProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllProjectsQuery, GetAllProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllProjectsQuery, GetAllProjectsQueryVariables>(GetAllProjectsDocument, options);
        }
export type GetAllProjectsQueryHookResult = ReturnType<typeof useGetAllProjectsQuery>;
export type GetAllProjectsLazyQueryHookResult = ReturnType<typeof useGetAllProjectsLazyQuery>;
export type GetAllProjectsQueryResult = Apollo.QueryResult<GetAllProjectsQuery, GetAllProjectsQueryVariables>;
export const GetOneProjectDocument = gql`
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

/**
 * __useGetOneProjectQuery__
 *
 * To run a query within a React component, call `useGetOneProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOneProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOneProjectQuery({
 *   variables: {
 *      getOneProjectId: // value for 'getOneProjectId'
 *   },
 * });
 */
export function useGetOneProjectQuery(baseOptions: Apollo.QueryHookOptions<GetOneProjectQuery, GetOneProjectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOneProjectQuery, GetOneProjectQueryVariables>(GetOneProjectDocument, options);
      }
export function useGetOneProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOneProjectQuery, GetOneProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOneProjectQuery, GetOneProjectQueryVariables>(GetOneProjectDocument, options);
        }
export type GetOneProjectQueryHookResult = ReturnType<typeof useGetOneProjectQuery>;
export type GetOneProjectLazyQueryHookResult = ReturnType<typeof useGetOneProjectLazyQuery>;
export type GetOneProjectQueryResult = Apollo.QueryResult<GetOneProjectQuery, GetOneProjectQueryVariables>;
export const GetAllProjectsDeliveryDateDocument = gql`
    query GetAllProjectsDeliveryDate {
  getAllProjects {
    delivered_at
  }
}
    `;

/**
 * __useGetAllProjectsDeliveryDateQuery__
 *
 * To run a query within a React component, call `useGetAllProjectsDeliveryDateQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllProjectsDeliveryDateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllProjectsDeliveryDateQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllProjectsDeliveryDateQuery(baseOptions?: Apollo.QueryHookOptions<GetAllProjectsDeliveryDateQuery, GetAllProjectsDeliveryDateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllProjectsDeliveryDateQuery, GetAllProjectsDeliveryDateQueryVariables>(GetAllProjectsDeliveryDateDocument, options);
      }
export function useGetAllProjectsDeliveryDateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllProjectsDeliveryDateQuery, GetAllProjectsDeliveryDateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllProjectsDeliveryDateQuery, GetAllProjectsDeliveryDateQueryVariables>(GetAllProjectsDeliveryDateDocument, options);
        }
export type GetAllProjectsDeliveryDateQueryHookResult = ReturnType<typeof useGetAllProjectsDeliveryDateQuery>;
export type GetAllProjectsDeliveryDateLazyQueryHookResult = ReturnType<typeof useGetAllProjectsDeliveryDateLazyQuery>;
export type GetAllProjectsDeliveryDateQueryResult = Apollo.QueryResult<GetAllProjectsDeliveryDateQuery, GetAllProjectsDeliveryDateQueryVariables>;
export const CreateTicketDocument = gql`
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
export type CreateTicketMutationFn = Apollo.MutationFunction<CreateTicketMutation, CreateTicketMutationVariables>;

/**
 * __useCreateTicketMutation__
 *
 * To run a mutation, you first call `useCreateTicketMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTicketMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTicketMutation, { data, loading, error }] = useCreateTicketMutation({
 *   variables: {
 *      membersIds: // value for 'membersIds'
 *      projectId: // value for 'projectId'
 *      ticket: // value for 'ticket'
 *   },
 * });
 */
export function useCreateTicketMutation(baseOptions?: Apollo.MutationHookOptions<CreateTicketMutation, CreateTicketMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTicketMutation, CreateTicketMutationVariables>(CreateTicketDocument, options);
      }
export type CreateTicketMutationHookResult = ReturnType<typeof useCreateTicketMutation>;
export type CreateTicketMutationResult = Apollo.MutationResult<CreateTicketMutation>;
export type CreateTicketMutationOptions = Apollo.BaseMutationOptions<CreateTicketMutation, CreateTicketMutationVariables>;
export const UpdateTicketDocument = gql`
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
export type UpdateTicketMutationFn = Apollo.MutationFunction<UpdateTicketMutation, UpdateTicketMutationVariables>;

/**
 * __useUpdateTicketMutation__
 *
 * To run a mutation, you first call `useUpdateTicketMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTicketMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTicketMutation, { data, loading, error }] = useUpdateTicketMutation({
 *   variables: {
 *      ticketInput: // value for 'ticketInput'
 *   },
 * });
 */
export function useUpdateTicketMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTicketMutation, UpdateTicketMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTicketMutation, UpdateTicketMutationVariables>(UpdateTicketDocument, options);
      }
export type UpdateTicketMutationHookResult = ReturnType<typeof useUpdateTicketMutation>;
export type UpdateTicketMutationResult = Apollo.MutationResult<UpdateTicketMutation>;
export type UpdateTicketMutationOptions = Apollo.BaseMutationOptions<UpdateTicketMutation, UpdateTicketMutationVariables>;
export const UpdateUsersFromTicketDocument = gql`
    mutation UpdateUsersFromTicket($userId: String!, $updateUsersFromTicketId: String!) {
  updateUsersFromTicket(userId: $userId, id: $updateUsersFromTicketId) {
    id
  }
}
    `;
export type UpdateUsersFromTicketMutationFn = Apollo.MutationFunction<UpdateUsersFromTicketMutation, UpdateUsersFromTicketMutationVariables>;

/**
 * __useUpdateUsersFromTicketMutation__
 *
 * To run a mutation, you first call `useUpdateUsersFromTicketMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUsersFromTicketMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUsersFromTicketMutation, { data, loading, error }] = useUpdateUsersFromTicketMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      updateUsersFromTicketId: // value for 'updateUsersFromTicketId'
 *   },
 * });
 */
export function useUpdateUsersFromTicketMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUsersFromTicketMutation, UpdateUsersFromTicketMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUsersFromTicketMutation, UpdateUsersFromTicketMutationVariables>(UpdateUsersFromTicketDocument, options);
      }
export type UpdateUsersFromTicketMutationHookResult = ReturnType<typeof useUpdateUsersFromTicketMutation>;
export type UpdateUsersFromTicketMutationResult = Apollo.MutationResult<UpdateUsersFromTicketMutation>;
export type UpdateUsersFromTicketMutationOptions = Apollo.BaseMutationOptions<UpdateUsersFromTicketMutation, UpdateUsersFromTicketMutationVariables>;
export const DeleteTicketDocument = gql`
    mutation DeleteTicket($deleteTicketId: String!) {
  deleteTicket(id: $deleteTicketId)
}
    `;
export type DeleteTicketMutationFn = Apollo.MutationFunction<DeleteTicketMutation, DeleteTicketMutationVariables>;

/**
 * __useDeleteTicketMutation__
 *
 * To run a mutation, you first call `useDeleteTicketMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTicketMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTicketMutation, { data, loading, error }] = useDeleteTicketMutation({
 *   variables: {
 *      deleteTicketId: // value for 'deleteTicketId'
 *   },
 * });
 */
export function useDeleteTicketMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTicketMutation, DeleteTicketMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTicketMutation, DeleteTicketMutationVariables>(DeleteTicketDocument, options);
      }
export type DeleteTicketMutationHookResult = ReturnType<typeof useDeleteTicketMutation>;
export type DeleteTicketMutationResult = Apollo.MutationResult<DeleteTicketMutation>;
export type DeleteTicketMutationOptions = Apollo.BaseMutationOptions<DeleteTicketMutation, DeleteTicketMutationVariables>;
export const GetAllTicketsDocument = gql`
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

/**
 * __useGetAllTicketsQuery__
 *
 * To run a query within a React component, call `useGetAllTicketsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllTicketsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllTicketsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllTicketsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllTicketsQuery, GetAllTicketsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllTicketsQuery, GetAllTicketsQueryVariables>(GetAllTicketsDocument, options);
      }
export function useGetAllTicketsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllTicketsQuery, GetAllTicketsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllTicketsQuery, GetAllTicketsQueryVariables>(GetAllTicketsDocument, options);
        }
export type GetAllTicketsQueryHookResult = ReturnType<typeof useGetAllTicketsQuery>;
export type GetAllTicketsLazyQueryHookResult = ReturnType<typeof useGetAllTicketsLazyQuery>;
export type GetAllTicketsQueryResult = Apollo.QueryResult<GetAllTicketsQuery, GetAllTicketsQueryVariables>;
export const GetAllTicketsByProjectDocument = gql`
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

/**
 * __useGetAllTicketsByProjectQuery__
 *
 * To run a query within a React component, call `useGetAllTicketsByProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllTicketsByProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllTicketsByProjectQuery({
 *   variables: {
 *      getAllTicketsByProjectId: // value for 'getAllTicketsByProjectId'
 *   },
 * });
 */
export function useGetAllTicketsByProjectQuery(baseOptions: Apollo.QueryHookOptions<GetAllTicketsByProjectQuery, GetAllTicketsByProjectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllTicketsByProjectQuery, GetAllTicketsByProjectQueryVariables>(GetAllTicketsByProjectDocument, options);
      }
export function useGetAllTicketsByProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllTicketsByProjectQuery, GetAllTicketsByProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllTicketsByProjectQuery, GetAllTicketsByProjectQueryVariables>(GetAllTicketsByProjectDocument, options);
        }
export type GetAllTicketsByProjectQueryHookResult = ReturnType<typeof useGetAllTicketsByProjectQuery>;
export type GetAllTicketsByProjectLazyQueryHookResult = ReturnType<typeof useGetAllTicketsByProjectLazyQuery>;
export type GetAllTicketsByProjectQueryResult = Apollo.QueryResult<GetAllTicketsByProjectQuery, GetAllTicketsByProjectQueryVariables>;
export const GetOneTicketDocument = gql`
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

/**
 * __useGetOneTicketQuery__
 *
 * To run a query within a React component, call `useGetOneTicketQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOneTicketQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOneTicketQuery({
 *   variables: {
 *      getOneTicketId: // value for 'getOneTicketId'
 *   },
 * });
 */
export function useGetOneTicketQuery(baseOptions: Apollo.QueryHookOptions<GetOneTicketQuery, GetOneTicketQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOneTicketQuery, GetOneTicketQueryVariables>(GetOneTicketDocument, options);
      }
export function useGetOneTicketLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOneTicketQuery, GetOneTicketQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOneTicketQuery, GetOneTicketQueryVariables>(GetOneTicketDocument, options);
        }
export type GetOneTicketQueryHookResult = ReturnType<typeof useGetOneTicketQuery>;
export type GetOneTicketLazyQueryHookResult = ReturnType<typeof useGetOneTicketLazyQuery>;
export type GetOneTicketQueryResult = Apollo.QueryResult<GetOneTicketQuery, GetOneTicketQueryVariables>;
export const RegisterUserDocument = gql`
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
export type RegisterUserMutationFn = Apollo.MutationFunction<RegisterUserMutation, RegisterUserMutationVariables>;

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      userInput: // value for 'userInput'
 *   },
 * });
 */
export function useRegisterUserMutation(baseOptions?: Apollo.MutationHookOptions<RegisterUserMutation, RegisterUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument, options);
      }
export type RegisterUserMutationHookResult = ReturnType<typeof useRegisterUserMutation>;
export type RegisterUserMutationResult = Apollo.MutationResult<RegisterUserMutation>;
export type RegisterUserMutationOptions = Apollo.BaseMutationOptions<RegisterUserMutation, RegisterUserMutationVariables>;
export const UpdateUserDocument = gql`
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
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      userInput: // value for 'userInput'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const UpdatePasswordDocument = gql`
    mutation UpdatePassword($password: String!, $updatePasswordId: String!) {
  updatePassword(password: $password, id: $updatePasswordId)
}
    `;
export type UpdatePasswordMutationFn = Apollo.MutationFunction<UpdatePasswordMutation, UpdatePasswordMutationVariables>;

/**
 * __useUpdatePasswordMutation__
 *
 * To run a mutation, you first call `useUpdatePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePasswordMutation, { data, loading, error }] = useUpdatePasswordMutation({
 *   variables: {
 *      password: // value for 'password'
 *      updatePasswordId: // value for 'updatePasswordId'
 *   },
 * });
 */
export function useUpdatePasswordMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePasswordMutation, UpdatePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePasswordMutation, UpdatePasswordMutationVariables>(UpdatePasswordDocument, options);
      }
export type UpdatePasswordMutationHookResult = ReturnType<typeof useUpdatePasswordMutation>;
export type UpdatePasswordMutationResult = Apollo.MutationResult<UpdatePasswordMutation>;
export type UpdatePasswordMutationOptions = Apollo.BaseMutationOptions<UpdatePasswordMutation, UpdatePasswordMutationVariables>;
export const DeleteUserDocument = gql`
    mutation DeleteUser($deleteUserId: String!) {
  deleteUser(id: $deleteUserId)
}
    `;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      deleteUserId: // value for 'deleteUserId'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
export const GetProfileDocument = gql`
    query GetProfile {
  getProfile {
    id
    firstname
    lastname
    job_title
    email
    role
    projects {
      id
      name
      status
      description
      created_at
      delivered_at
      due_at
      members {
        id
      }
    }
    tickets {
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
      spent_time
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
}
    `;

/**
 * __useGetProfileQuery__
 *
 * To run a query within a React component, call `useGetProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProfileQuery(baseOptions?: Apollo.QueryHookOptions<GetProfileQuery, GetProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, options);
      }
export function useGetProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProfileQuery, GetProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, options);
        }
export type GetProfileQueryHookResult = ReturnType<typeof useGetProfileQuery>;
export type GetProfileLazyQueryHookResult = ReturnType<typeof useGetProfileLazyQuery>;
export type GetProfileQueryResult = Apollo.QueryResult<GetProfileQuery, GetProfileQueryVariables>;
export const GetAllUsersDocument = gql`
    query GetAllUsers {
  getAllUsers {
    id
    firstname
    lastname
    job_title
    email
    role
  }
}
    `;

/**
 * __useGetAllUsersQuery__
 *
 * To run a query within a React component, call `useGetAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
      }
export function useGetAllUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
        }
export type GetAllUsersQueryHookResult = ReturnType<typeof useGetAllUsersQuery>;
export type GetAllUsersLazyQueryHookResult = ReturnType<typeof useGetAllUsersLazyQuery>;
export type GetAllUsersQueryResult = Apollo.QueryResult<GetAllUsersQuery, GetAllUsersQueryVariables>;
export const GetOneUserDocument = gql`
    query GetOneUser($getOneUserId: String!) {
  getOneUser(id: $getOneUserId) {
    id
    firstname
    lastname
    job_title
    email
    role
    projects {
      id
      name
      status
      description
    }
    tickets {
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
      spent_time
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
}
    `;

/**
 * __useGetOneUserQuery__
 *
 * To run a query within a React component, call `useGetOneUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOneUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOneUserQuery({
 *   variables: {
 *      getOneUserId: // value for 'getOneUserId'
 *   },
 * });
 */
export function useGetOneUserQuery(baseOptions: Apollo.QueryHookOptions<GetOneUserQuery, GetOneUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOneUserQuery, GetOneUserQueryVariables>(GetOneUserDocument, options);
      }
export function useGetOneUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOneUserQuery, GetOneUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOneUserQuery, GetOneUserQueryVariables>(GetOneUserDocument, options);
        }
export type GetOneUserQueryHookResult = ReturnType<typeof useGetOneUserQuery>;
export type GetOneUserLazyQueryHookResult = ReturnType<typeof useGetOneUserLazyQuery>;
export type GetOneUserQueryResult = Apollo.QueryResult<GetOneUserQuery, GetOneUserQueryVariables>;