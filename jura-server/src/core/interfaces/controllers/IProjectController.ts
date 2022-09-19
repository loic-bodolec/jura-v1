import Project from '../../../dataLayer/entities/Project';
import { CreateProjectInput, UpdateProjectInput } from '../../../resolvers/project/ProjectInput';
import { IContext } from '../context/IContext';

export interface IProjectController {
  getAllProjects: () => Promise<Project[]>;
  getOneProject: (id: string) => Promise<Project>;
  createProject: (
    project: CreateProjectInput,
    membersIds: string[],
    ownerId: string,
  ) => Promise<Project>;
  updateProject: (context: IContext, project: UpdateProjectInput) => Promise<Partial<Project>>;
  updateUsersFromProject: (id: string, userId: string) => Promise<Project>;
}
