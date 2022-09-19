import { getConnection } from 'typeorm';
import { ActionException } from '../../../core/exceptions/ActionException';
import Exception from '../../../core/exceptions/Exception';
import TicketNotFoundException from '../../../core/exceptions/TicketNotFoundException';
import { UnexpectedException } from '../../../core/exceptions/UnexpectedException';
import { ITicketService } from '../../../core/interfaces/services/ITicketService';
import { ProjectStatus } from '../../../dataLayer/entities/Project';
import Ticket from '../../../dataLayer/entities/Ticket';
import User from '../../../dataLayer/entities/User';
import { TicketRepository } from '../../../dataLayer/repositories/TicketRepository';
import { ProjectService } from '../project/ProjectService';
import { UserService } from '../user/UserService';

export class TicketService implements ITicketService {
  private repository = getConnection().getCustomRepository(TicketRepository);

  private userService = new UserService();

  public async getAll(): Promise<Ticket[]> {
    const tickets = await this.repository.find();
    if (!tickets) throw new UnexpectedException();
    return tickets;
  }

  public async getOne(id: string): Promise<Ticket> {
    const ticket = await this.repository.findOne(id);
    if (!ticket) throw new TicketNotFoundException();
    return ticket;
  }

  public async getAllByProject(id: string): Promise<Ticket[]> {
    const result = await this.repository.find({ where: { project: id } });
    if (!result) throw new UnexpectedException();
    return result;
  }

  public async getAllByUser(id: string): Promise<Ticket[]> {
    const result = await this.repository.find({ id });
    if (!result) throw new UnexpectedException();
    return result;
  }

  public async create(
    identity: User,
    ticket: {
      title: string;
      status: string;
      priority: string;
      description?: string;
      estimated_time: number;
      spent_time: number;
      due_date: Date;
    },
    projectId: string,
    membersIds: string[],
  ): Promise<Ticket> {
    const projectService = new ProjectService();
    const userService = new UserService();

    const newTicket = this.repository.create(ticket);

    newTicket.created_by = Promise.resolve(identity);

    const project = await projectService.getOne(projectId);
    if (project.status === ProjectStatus.CLOSED) throw new Exception('The project is closed');
    newTicket.project = Promise.resolve(project);

    if (!(membersIds && membersIds.length)) throw new Exception('You must add at least one member');
    const members = await userService.getMany(membersIds);
    newTicket.users = Promise.resolve(members);

    return newTicket.save();
  }

  public async update(
    identity: User,
    ticket: {
      id: string;
      status?: string;
      priority?: string;
      title?: string;
      description?: string;
      estimated_time?: number;
      spent_time?: number;
      due_date?: Date;
    },
  ): Promise<Partial<Ticket>> {
    const currentTicket = await this.validateGetTicket(identity, ticket.id);
    const updatedTicket = await this.repository.update(currentTicket.id, ticket);
    if (!updatedTicket.affected) throw new UnexpectedException();
    return { ...ticket, ...currentTicket };
  }

  /**
   * Add/remove members from a ticket
   * @param  {identity} User
   * @param {id} string the ticket id
   * @param {userId} string the user id to add/remove
   * @returns {Promise<Ticket>} the updated ticket
   */
  public async updateUsersFromTicket(identity: User, id: string, userId: string): Promise<Ticket> {
    const ticket = await this.validateGetTicket(identity, id);

    const userToUpdate = await this.userService.getOne(userId);

    const members = await ticket.users;
    const updatedMembers = members?.find((u) => u.id === userToUpdate.id)
      ? members.filter((u) => u.id !== userToUpdate.id)
      : [...(members ?? []), userToUpdate];

    ticket.users = Promise.resolve(updatedMembers);

    const updatedTicket = await this.repository.save(ticket);
    return updatedTicket;
  }

  public async deleteTicket(identity: User, id: string): Promise<void> {
    const ticket = await this.validateGetTicket(identity, id);
    const result = await this.repository.delete({ id: ticket.id });
    if (!result.affected) throw new UnexpectedException();
  }

  private async validateGetTicket(identity: User, ticketId: string): Promise<Ticket> {
    const ticket = await this.repository.findOne({ id: ticketId });
    if (!ticket) throw new TicketNotFoundException();

    const members = await ticket.users;
    const creator = await ticket.created_by;
    if (members.find((m) => m.id === identity.id) || identity.id === creator.id) return ticket;
    throw new ActionException();
  }
}
