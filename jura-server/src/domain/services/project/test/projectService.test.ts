/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO fix projectService.test.ts
import { ProjectStatus } from '../../../../dataLayer/entities/Project';
import User from '../../../../dataLayer/entities/User';
import { newProjectMock } from '../../../../test/mock/project/projectMock';
import { newUserMock } from '../../../../test/mock/user/userMock';
import { UserService } from '../../user/UserService';
import { ProjectService } from '../ProjectService';

describe('project service', () => {
  it('should get all projects', async () => {
    const projectService = new ProjectService();
    await projectService.create(newProjectMock, [], '');
    await projectService.create(newProjectMock, [], '');
    await projectService.create(newProjectMock, [], '');

    const projectDb = await projectService.getAll();
    expect(projectDb).toEqual([
      expect.objectContaining({ name: 'new project' }),
      expect.objectContaining({ name: 'new project' }),
      expect.objectContaining({ name: 'new project' }),
    ]);
  });

  it('should throw an error if the project is not found', async () => {
    const projectService = new ProjectService();

    try {
      await projectService.getOne('1');
    } catch (e: any) {
      expect(e.message).toBe('Project not found');
    }
  });

  it('should create a new project without members and owner', async () => {
    const projectService = new ProjectService();

    const newProject = await projectService.create(newProjectMock, [], '');
    expect(newProject).toEqual(expect.objectContaining({ name: 'new project' }));

    const projectDb = await projectService.getOne(newProject.id);
    expect(projectDb.name).toEqual(newProject.name);
    expect(projectDb.status).toEqual(ProjectStatus.OPEN);
    expect(await projectDb.members).toEqual([]);
    expect(await projectDb.owner).toBeNull();
  });

  it('should create a new project with members and owner', async () => {
    const projectService = new ProjectService();
    const userService = new UserService();

    const member1 = await userService.register(newUserMock);
    const member2 = await userService.register({ ...newUserMock, email: 'other email' });

    const newProject = await projectService.create(
      newProjectMock,
      [member1.id, member2.id],
      member1.id,
    );
    expect(newProject).toEqual(expect.objectContaining({ name: 'new project' }));

    const projectDb = await projectService.getOne(newProject.id);
    expect(projectDb.name).toEqual(newProject.name);
    expect(projectDb.status).toEqual(ProjectStatus.OPEN);
    expect((await projectDb.members)?.length).toEqual(2);
    expect(await projectDb.owner).toEqual(member1);
  });

  // it('should update a project', async () => {
  //   const projectService = new ProjectService();
  //   const newProject = await projectService.create(      identity: User, newProjectMock, [], '');

  //   const updatedProjectDd = await projectService.update({
  //     ...newProject,
  //     status: ProjectStatus.CLOSED,
  //   });

  //   expect(updatedProjectDd).toEqual(expect.objectContaining({ status: ProjectStatus.CLOSED }));
  //   expect(updatedProjectDd.delivered_at).not.toBeNull();
  // });

  // it('should throw an error if the project is not updated', async () => {
  //   const projectService = new ProjectService();

  //   try {
  //     await projectService.update({ ...newProjectMock, id: '1', status: ProjectStatus.CLOSED });
  //   } catch (e: any) {
  //     expect(e.message).toBe('Something went wrong');
  //   }
  // });

  it('should update user from project', async () => {
    const projectService = new ProjectService();
    const userService = new UserService();

    // add a user
    const user = await userService.register(newUserMock);
    const project = await projectService.create(newProjectMock, [], '');
    const updatedProjectDb = await projectService.updateUsersFromProject(project.id, user.id);

    const members = await updatedProjectDb.members;
    expect(members).toEqual([expect.objectContaining(user)]);

    // remove a user
    const updatedProjectDd2 = await projectService.updateUsersFromProject(
      project.id,
      members?.[0].id as User['id'],
    );
    expect(await updatedProjectDd2.members).toEqual([]);
  });
});
