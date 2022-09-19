import { ProjectStatus } from '../../../dataLayer/entities/Project';
import { CreateProjectInput } from '../../../resolvers/project/ProjectInput';

export const newProjectMock: CreateProjectInput = {
  name: 'new project',
  description: 'a nice project',
  status: ProjectStatus.OPEN,
};
