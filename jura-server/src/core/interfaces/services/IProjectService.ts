import Project, { ProjectStatus } from '../../../dataLayer/entities/Project';
import User from '../../../dataLayer/entities/User';

export interface IProjectService {
  getAll: () => Promise<Project[]>;
  getOne: (id: string) => Promise<Project>;
  create: (
    project: { name: string; status: ProjectStatus; description?: string; due_at?: Date },
    membersIds: string[],
    ownerId: string,
  ) => Promise<Project>;
  update: (
    identity: User,
    project: {
      id: string;
      name: string;
      status: ProjectStatus;
      description?: string;
      delivered_at?: Date;
    },
  ) => Promise<Partial<Project>>;
  updateUsersFromProject: (id: string, userId: string) => Promise<Project>;
}
