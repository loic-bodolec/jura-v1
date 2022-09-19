import { ApolloError } from '@apollo/client';
import { Row } from 'react-bootstrap';
import { Ticket } from '../../services/api/generated/graphql';
import { FormError } from '../atomics/form/formError/FormError';
import { Loader } from '../atomics/loader/Loader';
import { TicketsSwimlane } from './ticketswimlane/TicketsSwimlane';

export interface TicketsSwimlanesProps {
  tickets?: Array<Ticket>;
  loading: boolean;
  error: ApolloError | undefined;
}

export const TicketsSwimlanes = ({ tickets, loading, error }: TicketsSwimlanesProps) => {
  const toDoTickets = tickets?.filter((ticket) => ticket?.status === 'à faire');
  const inProgressTickets = tickets?.filter((ticket) => ticket?.status === 'en cours');
  const toValidateTickets = tickets?.filter((ticket) => ticket?.status === 'à valider');
  const closedTickets = tickets?.filter((ticket) => ticket?.status === 'clos');

  if (error) {
    return <FormError error={error} message="Erreur lors du chargement des données" />;
  }

  if (loading) {
    return <Loader message="Chargement des tickets..." />;
  }

  return (
    <Row className="d-flex justify-content-center align-items-center mx-0">
      <TicketsSwimlane title="A FAIRE" backgroundColor="rgba(255, 99, 132, 0.5)" tickets={toDoTickets} />
      <TicketsSwimlane title="EN COURS" backgroundColor="rgba(54, 162, 235, 0.5)" tickets={inProgressTickets} />
      <TicketsSwimlane title="A VALIDER" backgroundColor="rgba(255, 206, 86, 0.5)" tickets={toValidateTickets} />
      <TicketsSwimlane title="CLOS" backgroundColor="rgba(102, 205, 170, 0.5)" tickets={closedTickets} />
    </Row>
  );
};
