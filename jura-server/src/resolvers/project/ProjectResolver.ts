/* eslint-disable @typescript-eslint/indent */
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { IContext } from '../../core/interfaces/context/IContext';
import { IProjectController } from '../../core/interfaces/controllers/IProjectController';
import Project from '../../dataLayer/entities/Project';
import { ProjectService } from '../../domain/services/project/ProjectService';
import { CreateProjectInput, UpdateProjectInput } from './ProjectInput';

@Resolver(Project)
export class ProjectResolver implements IProjectController {
  private service: ProjectService = new ProjectService();

  @Authorized()
  @Query(() => [Project])
  async getAllProjects(): Promise<Project[]> {
    const results = await this.service.getAll();
    return results;
  }

  @Authorized()
  @Query(() => Project)
  async getOneProject(@Arg('id') id: string): Promise<Project> {
    const result = await this.service.getOne(id);
    return result;
  }

  @Authorized()
  @Mutation(() => Project)
  async createProject(
    @Arg('projectInput') projectInput: CreateProjectInput,
    @Arg('membersIds', () => [String]) membersIds: string[],
    @Arg('ownerId') ownerId: string,
  ): Promise<Project> {
    const result = await this.service.create(projectInput, membersIds, ownerId);
    return result;
  }

  @Authorized()
  @Mutation(() => Project)
  async updateProject(
    @Ctx() context: IContext,
    @Arg('projectInput') projectInput: UpdateProjectInput,
  ): Promise<Partial<Project>> {
    if (context.user) {
      const result = await this.service.update(context.user, projectInput);
      return result;
    }
    throw new Error('Project not updated');
  }

  @Authorized()
  @Mutation(() => Project)
  async updateUsersFromProject(
    @Arg('id') id: string,
    @Arg('userId') userId: string,
  ): Promise<Project> {
    const result = await this.service.updateUsersFromProject(id, userId);
    return result;
  }
}
