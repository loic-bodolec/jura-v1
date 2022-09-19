import { GraphQLError } from 'graphql';
import { CREATE_TICKET } from '../../services/api/ticket/ticket-mutations';
import { GET_ALL_USERS } from '../../services/api/user/user-queries';

export const CREATE_TICKET_MOCK_SUCCESS = {
  request: {
    query: CREATE_TICKET,
    variables: {
      ticket: {
        status: 'à faire',
        priority: 'MEDIUM',
        title: 'new ticket',
        description: '',
        due_date: '',
        estimated_time: 0,
        spent_time: 0
      },
      membersIds: [],
      projectId: ''
    }
  },
  result: {
    data: {
      ticket: {
        title: 'new ticket',
        description: '',
        status: 'à faire',
        priority: 'MEDIUM',
        due_date: '',
        estimated_time: 0,
        spent_time: 0
      },
      membersIds: ['1', '2'],
      projectId: ''
    }
  }
};

export const GET_ALL_USERS_MOCK_FAILURE = {
  request: {
    query: GET_ALL_USERS
  },
  error: [new GraphQLError('Error!')]
};
