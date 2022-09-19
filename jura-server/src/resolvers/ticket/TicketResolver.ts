/* eslint-disable @typescript-eslint/indent */
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { IContext } from '../../core/interfaces/context/IContext';
import { ITicketController } from '../../core/interfaces/controllers/ITicketController';
import Ticket from '../../dataLayer/entities/Ticket';
import { TicketService } from '../../domain/services/ticket/TicketService';
import { CreateTicketInput, UpdateTicketInput } from './TicketInput';

@Resolver(Ticket)
export class TicketResolver implements ITicketController {
  private service: TicketService = new TicketService();

  @Authorized() // only logged users can get the tickets
  @Query(() => [Ticket])
  async getAllTickets(): Promise<Ticket[]> {
    const results = await this.service.getAll();
    return results;
  }

  @Authorized()
  @Query(() => Ticket)
  async getOneTicket(@Arg('id') id: string): Promise<Ticket> {
    const result = await this.service.getOne(id);
    return result;
  }

  @Authorized()
  @Query(() => [Ticket])
  async getAllTicketsByProject(@Arg('id') id: string): Promise<Ticket[]> {
    const result = await this.service.getAllByProject(id);
    return result;
  }

  @Authorized()
  @Query(() => [Ticket])
  async getAllTicketsByUser(@Arg('id') id: string): Promise<Ticket[]> {
    const result = await this.service.getAllByUser(id);
    return result;
  }

  @Authorized()
  @Mutation(() => Ticket)
  async createTicket(
    @Ctx() context: IContext,
    @Arg('ticket') ticket: CreateTicketInput,
    @Arg('projectId') projectId: string,
    @Arg('membersIds', () => [String]) membersIds: string[],
  ): Promise<Ticket> {
    if (context.user) {
      const result = await this.service.create(context.user, ticket, projectId, membersIds);
      return result;
    }
    throw new Error('Ticket not created');
  }

  @Authorized()
  @Mutation(() => Ticket)
  async updateTicket(
    @Ctx() context: IContext,
    @Arg('ticketInput') ticket: UpdateTicketInput,
  ): Promise<Partial<Ticket>> {
    if (context.user) {
      const result = await this.service.update(context.user, ticket);
      return result;
    }
    throw new Error('Ticket not updated');
  }

  @Authorized()
  @Mutation(() => Ticket)
  async updateUsersFromTicket(
    @Ctx() context: IContext,
    @Arg('id') id: string,
    @Arg('userId') userId: string,
  ): Promise<Ticket> {
    if (context.user) {
      const result = await this.service.updateUsersFromTicket(context.user, id, userId);
      return result;
    }
    throw new Error('User(s) not updated');
  }

  @Authorized()
  @Mutation(() => Boolean)
  async deleteTicket(@Ctx() context: IContext, @Arg('id') id: string): Promise<boolean> {
    if (context.user) {
      await this.service.deleteTicket(context.user, id);
    }
    return true;
  }
}
