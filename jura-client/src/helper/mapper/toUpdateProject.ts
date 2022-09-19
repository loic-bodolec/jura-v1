import { Project, UpdateProjectInput } from '../../services/api/generated/graphql';
import { ProjectStatus } from '../../services/models/project';

export const toUpdateProject = (project: Project): UpdateProjectInput => {
  return {
    description: project.description,
    id: project.id,
    name: project.name,
    status: project.status === ProjectStatus.OPEN ? ProjectStatus.CLOSED : ProjectStatus.OPEN
  };
};
