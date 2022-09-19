import { GET_ALL_USERS } from '../../services/api/user/user-queries';

export const GET_ALL_USERS_MOCK_SUCCESS = {
  request: {
    query: GET_ALL_USERS
  },
  result: {
    data: {
      getAllUsers: [
        {
          id: '1',
          firstname: 'John',
          lastname: 'Doe',
          job_title: 'nice job',
          email: 'mail@example.com'
        },
        {
          id: '2',
          firstname: 'Jules',
          lastname: 'Doe',
          job_title: 'nice job',
          email: 'mail@example.com'
        },
        {
          id: '3',
          firstname: 'Julia',
          lastname: 'Doe',
          job_title: 'nice job',
          email: 'mail@example.com'
        },
        {
          id: '4',
          firstname: 'Jane',
          lastname: 'Doe',
          job_title: 'nice job',
          email: 'mail@example.com'
        }
      ]
    }
  }
};

export const GET_ALL_USERS_MOCK_FAILURE = {
  request: {
    query: GET_ALL_USERS
  },
  error: new Error('An error occurred')
};
