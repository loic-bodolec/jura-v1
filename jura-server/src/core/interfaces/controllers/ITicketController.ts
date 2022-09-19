import Ticket from '../../../dataLayer/entities/Ticket';
import { CreateTicketInput, UpdateTicketInput } from '../../../resolvers/ticket/TicketInput';
import { IContext } from '../context/IContext';

export interface ITicketController {
  getAllTickets: () => Promise<Ticket[]>;
  getOneTicket: (id: string) => Promise<Ticket>;
  createTicket: (
    context: IContext,
    ticket: CreateTicketInput,
    projectId: string,
    membersIds: string[],
  ) => Promise<Ticket>;
  updateTicket: (context: IContext, ticket: UpdateTicketInput) => Promise<Partial<Ticket>>;
  updateUsersFromTicket: (context: IContext, id: string, userId: string) => Promise<Ticket>;
  deleteTicket: (context: IContext, id: string) => Promise<boolean>;
}
