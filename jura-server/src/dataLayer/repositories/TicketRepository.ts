import { EntityRepository, Repository } from 'typeorm';
import Ticket from '../entities/Ticket';

@EntityRepository(Ticket)
export class TicketRepository extends Repository<Ticket> {}
