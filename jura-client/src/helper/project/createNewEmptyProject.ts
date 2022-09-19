import { CreateProjectInput } from '../../services/api/generated/graphql';
import { ProjectStatus } from '../../services/models/project';

export const createNewEmptyProject = (): CreateProjectInput => {
  return {
    name: '',
    description: '',
    status: ProjectStatus.OPEN,
    due_at: ''
  };
};
