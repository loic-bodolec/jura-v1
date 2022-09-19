import Ticket from '../../../dataLayer/entities/Ticket';

export const getTimeDifferenceFromCreationToNow = (ticket: Ticket): number => {
  const diff = new Date().getTime() - new Date(ticket.created_at).getTime();
  return diff;
};
