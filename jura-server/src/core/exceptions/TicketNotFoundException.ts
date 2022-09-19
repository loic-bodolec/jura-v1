import { NotFoundException } from './NotFoundException';

class TicketNotFoundException extends NotFoundException {
  constructor() {
    super('Ticket');
  }
}

export default TicketNotFoundException;
