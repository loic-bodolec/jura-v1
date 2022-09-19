import { Card, Col } from 'react-bootstrap';
import { Ticket, User } from '../../../services/api/generated/graphql';
import { TicketPriority } from '../../../services/models/ticket';
import { TicketCard } from '../../atomics/ticketCard/TicketCard';

export interface TicketsSwimlaneProps {
  tickets?: Array<Ticket>;
  title?: string;
  color?: string;
  backgroundColor?: string;
}

export const TicketsSwimlane = ({ tickets, title, color, backgroundColor }: TicketsSwimlaneProps) => {
  const id = 'swimlane';

  return (
    <Col data-testid={id} sm={12} md={6} lg={3} className="d-flex flex-column align-items-center my-4">
      <Card.Header
        className="rounded shadow border-0"
        data-testid={`${id}-header`}
        style={{
          marginBottom: '1rem',
          padding: '1rem',
          fontWeight: 'bold',
          color: `${color}`,
          backgroundColor: `${backgroundColor}`,
          width: '20rem',
          textAlign: 'center'
        }}
      >
        {title}
      </Card.Header>
      <Card.Body className="tickets-list" data-testid={`${id}-tickets-list`}>
        {tickets &&
          tickets?.map((ticket: Ticket) => {
            return (
              <div key={ticket.id}>
                <TicketCard
                  id={ticket.id}
                  status={ticket.status}
                  priority={ticket.priority as TicketPriority}
                  title={ticket.title}
                  due_date={new Date(ticket.due_date)}
                  estimated_time={ticket.estimated_time}
                  created_by={ticket.created_by}
                  users={ticket.users as User[]}
                />
              </div>
            );
          })}
      </Card.Body>
    </Col>
  );
};
