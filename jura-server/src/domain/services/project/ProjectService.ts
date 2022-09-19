import { getConnection } from 'typeorm';
import { ActionException } from '../../../core/exceptions/ActionException';
import { ProjectNotFoundException } from '../../../core/exceptions/ProjectNotFoundException';
import { UnexpectedException } from '../../../core/exceptions/UnexpectedException';
import { IProjectService } from '../../../core/interfaces/services/IProjectService';
import Project, { ProjectStatus } from '../../../dataLayer/entities/Project';
import User from '../../../dataLayer/entities/User';
import { ProjectRepository } from '../../../dataLayer/repositories/ProjectRepository';
import { UserService } from '../user/UserService';

export class ProjectService implements IProjectService {
  private repository = getConnection().getCustomRepository(ProjectRepository);

  private userService = new UserService();

  /**
   * Retrieve all the projects
   * @returns {Promise<Project[]>} the projects
   */
  public async getAll(): Promise<Project[]> {
    const results = await this.repository.find();

    return results;
  }

  /**
   * Retrieve one project by id
   * @throws will throw an error if the project is not found
   * @returns {Promise<Project>} the project
   */
  public async getOne(id: string): Promise<Project> {
    const result = await this.repository.findOne(id);
    if (!result) throw new ProjectNotFoundException();

    return result;
  }

  /**
   * Create a project
   * @param {Project} project
   * @param {string[]} membersIds
   * @param {string} ownerId
   * @returns {Promise<Project>} the project
   */
  public async create(
    project: { name: string; status: ProjectStatus; description?: string; due_at?: Date },
    membersIds: string[],
    ownerId: string,
  ): Promise<Project> {
    const newProject = this.repository.create(project);

    if (membersIds && membersIds.length) {
      const members = await this.userService.getMany(membersIds);
      newProject.members = Promise.resolve(members);
    }

    if (ownerId) {
      const owner = await this.userService.getOne(ownerId);
      newProject.owner = Promise.resolve(owner);
    }

    return newProject.save();
  }

  /**
   * Update a project
   * @param {Project} project
   * @throws will throw an error if the project is not updated
   * @returns {Promise<Project>} the project
   */
  public async update(
    identity: User,
    project: {
      id: string;
      name: string;
      status: ProjectStatus;
      description?: string;
      delivered_at?: Date;
    },
  ): Promise<Partial<Project>> {
    if (project.status === ProjectStatus.CLOSED) {
      project.delivered_at = new Date();
    }
    const currentProject = await this.validateGetProject(identity, project.id);
    const updatedProject = await this.repository.update(currentProject.id, project);
    if (!updatedProject.affected) throw new UnexpectedException();
    return { ...project, ...currentProject };

    // const result = await this.repository.update(project.id, project);
    // if (!result.affected) throw new UnexpectedException();
    // const updatedProject = await this.getOne(project.id);
    // return updatedProject;
  }

  /**
   * Add/remove members from a project
   * @param {id} string the project id
   * @param {userId} string the user id to add/remove
   * @returns {Promise<Project>} the updated project
   */
  public async updateUsersFromProject(id: string, userId: string): Promise<Project> {
    const project = await this.getOne(id);
    const user = await this.userService.getOne(userId);

    const members = await project.members;
    const updatedMembers = members?.find((u) => u.id === user.id)
      ? members.filter((u) => u.id !== user.id)
      : [...(members ?? []), user];

    project.members = Promise.resolve(updatedMembers);

    const updatedProject = await this.repository.save(project);
    return updatedProject;
  }

  private async validateGetProject(identity: User, projectId: string): Promise<Project> {
    const project = await this.repository.findOne({ id: projectId });
    if (!project) throw new ProjectNotFoundException();

    const members = await project.members;
    const owner = await project.owner;
    if (members?.find((m) => m.id === identity.id) || identity.id === owner?.id) return project;
    throw new ActionException();
  }
}
