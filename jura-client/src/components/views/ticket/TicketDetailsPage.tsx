import { useQuery } from '@apollo/client';
import { Card, Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { GetOneTicketQuery, GetOneTicketQueryVariables, Ticket } from '../../../services/api/generated/graphql';
import { GET_ONE_TICKET } from '../../../services/api/ticket/ticket-queries';
import { FormError } from '../../atomics/form/formError/FormError';
import { Loader } from '../../atomics/loader/Loader';
import { CommentsThread } from '../../comments/CommentsThread';
import { TicketDetailsCard } from '../../tickets/ticketDetailsCard/TicketDetailsCard';

const TicketDetailsPage = () => {
  const { ticketId } = useParams();
  const { error, loading, data } = useQuery<GetOneTicketQuery, GetOneTicketQueryVariables>(GET_ONE_TICKET, {
    variables: { getOneTicketId: ticketId as string }
    // pollInterval: 1000
  });

  const ticketID = data?.getOneTicket.id;
  const ticketInfo = data?.getOneTicket;

  if (error) {
    return <FormError error={error} message="Erreur lors du chargement des données" />;
  }

  if (loading) {
    return <Loader message=" Chargement des données du ticket..." />;
  }

  return (
    <Row className="d-flex justify-content-center align-items-center my-5 mx-1" style={{ height: '100vh' }}>
      <Row className="d-flex justify-content-center align-items-center">
        <Card style={{ width: '90rem' }} className="flex-row flex-wrap rounded shadow border-0">
          <Col lg={6} md={12} sm={12} className="d-flex justify-content-center align-items-center my-5">
            <TicketDetailsCard ticketInfo={ticketInfo as Ticket} />
          </Col>
          <Col lg={6} md={12} sm={12} className="d-flex justify-content-center align-items-center my-5">
            <CommentsThread ticketID={ticketID} />
          </Col>
        </Card>
      </Row>
    </Row>
  );
};

export default TicketDetailsPage;
