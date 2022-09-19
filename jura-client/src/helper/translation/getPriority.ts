import { TicketPriority } from '../../services/models/ticket';

export const getPriorityTranslation = (priority: TicketPriority) => {
  switch (priority) {
    case TicketPriority.HIGH:
      return 'haute';
    case TicketPriority.MEDIUM:
      return 'moyenne';
    case TicketPriority.LOW:
      return 'basse';
  }
};
