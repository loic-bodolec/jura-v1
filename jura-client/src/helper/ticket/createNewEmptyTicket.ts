import { CreateTicketInput } from '../../services/api/generated/graphql';
import { TicketPriority, TicketStatus } from '../../services/models/ticket';

export const createNewEmptyTicket = (): CreateTicketInput => {
  return {
    title: '',
    description: '',
    status: TicketStatus.TODO,
    priority: TicketPriority.MEDIUM,
    due_date: '',
    estimated_time: 0,
    spent_time: 0
  };
};
