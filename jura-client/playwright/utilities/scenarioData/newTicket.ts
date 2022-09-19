import { formatDate } from '../functions';

export const newTicket = {
  project: {
    id: '1',
    name: 'Jura v2'
  },
  members: ['1', '2', '3'],
  data: {
    title: 'new ticket (test playwright)',
    priority: 'HIGH',
    estimated_time: '4',
    due_date: formatDate(new Date()),
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry...'
  }
};
