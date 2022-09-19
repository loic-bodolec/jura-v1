import { gql } from '@apollo/client';

export const GET_PROFILE = gql`
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

// export const GET_MY_TICKETS = gql`
//   query GetMyTickets {
//     getProfile {
//       tickets {
//         id
//         status
//         priority
//         description
//         title
//         due_date
//         estimated_time
//         created_at
//         created_by {
//           id
//           firstname
//           lastname
//         }
//         spent_time
//         project {
//           id
//           name
//         }
//         users {
//           id
//           firstname
//           lastname
//         }
//       }
//     }
//   }
// `;

export const GET_ALL_USERS = gql`
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

export const GET_ONE_USER = gql`
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
