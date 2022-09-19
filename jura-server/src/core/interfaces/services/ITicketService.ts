import Ticket from '../../../dataLayer/entities/Ticket';
import User from '../../../dataLayer/entities/User';

export interface ITicketService {
  getAll: () => Promise<Ticket[]>;
  getOne: (id: string) => Promise<Ticket>;
  create: (
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
  ) => Promise<Ticket>;
  update: (
    identity: User,
    ticket: {
      id: string;
      status?: string;
      priority?: string;
      title?: string;
      description?: string;
      estimated_time?: number;
      due_date?: Date;
    },
  ) => Promise<Partial<Ticket>>;
  updateUsersFromTicket: (identity: User, id: string, userId: string) => Promise<Ticket>;
  deleteTicket: (identity: User, id: string) => Promise<void>;
}
