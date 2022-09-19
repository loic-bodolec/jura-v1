import { CreateTicketInput } from '../../../resolvers/ticket/TicketInput';

export const newTicketMock: CreateTicketInput = {
  status: 'in progress',
  priority: 'red',
  description: 'a nice ticket',
  title: 'a nice sujet',
  estimated_time: 3,
  due_date: new Date(),
  spent_time: 0,
};
