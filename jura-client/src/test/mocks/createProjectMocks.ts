import { GraphQLError } from 'graphql';
import { CREATE_PROJECT } from '../../services/api/project/project-mutations';
import { GET_ALL_USERS } from '../../services/api/user/user-queries';
import { ProjectStatus } from '../../services/models/project';

export const CREATE_PROJECT_MOCK_SUCCESS = {
  request: {
    query: CREATE_PROJECT,
    variables: {
      projectInput: { name: 'new project', status: ProjectStatus.OPEN, description: '', due_at: '' },
      membersIds: ['1', '2', '3'],
      ownerId: '5'
    }
  },
  result: { data: { createProject: { id: '2', name: 'new project' } } }
};

export const CREATE_PROJECT_MOCK_SUCCESS_2 = {
  request: {
    query: CREATE_PROJECT,
    variables: {
      projectInput: { name: 'New project', description: '', status: 'OPEN', due_at: '' },
      membersIds: [],
      ownerId: ''
    }
  },
  result: { data: { createProject: { id: '2', name: 'new project' } } }
};

export const GET_ALL_USERS_MOCK_FAILURE = {
  request: {
    query: GET_ALL_USERS
  },
  error: [new GraphQLError('Error!')]
};
