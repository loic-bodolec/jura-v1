/* eslint-disable @typescript-eslint/no-non-null-assertion */
// TODO fix ticketService.test.ts
import User from '../../../../dataLayer/entities/User';
import { newProjectMock } from '../../../../test/mock/project/projectMock';
import { newTicketMock } from '../../../../test/mock/ticket/ticketMock';
import { newUserMock } from '../../../../test/mock/user/userMock';
import { ProjectService } from '../../project/ProjectService';
import { UserService } from '../../user/UserService';
import { TicketService } from '../TicketService';

describe('ticket service', () => {
  it('should create a new ticket', async () => {
    const projectService = new ProjectService();
    const ticketService = new TicketService();
    const userService = new UserService();
    const user = new User();

    const newProject = await projectService.create(newProjectMock, [], '');
    const member1 = await userService.register(newUserMock);

    const newTicket = await ticketService.create(user, newTicketMock, newProject.id, [member1.id]);
    expect(newTicket).toEqual(expect.objectContaining({ description: 'a nice ticket' }));

    const ticketDb = await ticketService.getOne(newTicket.id);
    expect(ticketDb.description).toEqual(newTicket.description);
    expect(ticketDb.status).toEqual(newTicket.status);
  });

  it('should get all tickets', async () => {
    const projectService = new ProjectService();
    const ticketService = new TicketService();
    const userService = new UserService();
    const user = new User();

    const newProject = await projectService.create(newProjectMock, [], '');
    const member1 = await userService.register(newUserMock);

    await ticketService.create(user, newTicketMock, newProject.id, [member1.id]);
    await ticketService.create(user, newTicketMock, newProject.id, [member1.id]);
    await ticketService.create(user, newTicketMock, newProject.id, [member1.id]);

    const ticketDb = await ticketService.getAll();
    expect(ticketDb).toEqual([
      expect.objectContaining({ title: 'a nice sujet', description: 'a nice ticket' }),
      expect.objectContaining({ title: 'a nice sujet', description: 'a nice ticket' }),
      expect.objectContaining({ title: 'a nice sujet', description: 'a nice ticket' }),
    ]);
  });

  it('should update the ticket', async () => {
    const projectService = new ProjectService();
    const ticketService = new TicketService();
    const userService = new UserService();
    const user = new User();

    const newProject = await projectService.create(newProjectMock, [], '');
    const member1 = await userService.register(newUserMock);
    const newTicket = await ticketService.create(user, newTicketMock, newProject.id, [member1.id]);

    const updatedTicket = await ticketService.update(user, {
      id: newTicket.id,
      description: newTicket.description,
      due_date: newTicket.due_date,
      estimated_time: 34,
      priority: 'blue',
    });

    const updatedTicketDb = await ticketService.getOne(updatedTicket.id!);
    expect(updatedTicketDb).toEqual(
      expect.objectContaining({ estimated_time: 34, priority: 'blue' }),
    );
  });
});
