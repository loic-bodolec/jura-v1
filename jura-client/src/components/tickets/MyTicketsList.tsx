import { useQuery } from '@apollo/client';
import { Card, Col, Row } from 'react-bootstrap';
import { GetProfileQuery, GetProfileQueryVariables, Ticket } from '../../services/api/generated/graphql';
import { GET_PROFILE } from '../../services/api/user/user-queries';
import { FormError } from '../atomics/form/formError/FormError';
import { Loader } from '../atomics/loader/Loader';
import { PieChartTicketsPriority } from '../features/charts/pieChart/PieChartTicketPriority';
import { PieChartTicketsStatus } from '../features/charts/pieChart/PieChartTicketStatus';
import { TicketsSwimlanes } from './TicketsSwimlanes';

const MyTicketsList = () => {
  const { data, loading, error } = useQuery<GetProfileQuery, GetProfileQueryVariables>(GET_PROFILE);

  const myTickets = data?.getProfile.tickets;

  if (error) {
    return <FormError error={error} message="Erreur lors du chargement des données" />;
  }

  if (loading) {
    return <Loader message="Chargement de mes tickets..." />;
  }

  return (
    <Row className="mx-1">
      <Col className="d-flex flex-column align-items-center mx-0">
        <Card style={{ margin: '5rem' }}>
          <Card.Header style={{ color: '#2e4acd', fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', textAlign: 'center' }}>
            Mes tickets
          </Card.Header>
          <Card.Body
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              marginBottom: '1rem',
              paddingBottom: '1rem'
            }}
          >
            <Col className="d-flex justify-content-center align-items-center">
              <PieChartTicketsStatus tickets={myTickets as Ticket[]} title="Statut de mes tickets" showTotal />
            </Col>
            <Col className="d-flex justify-content-center align-items-center">
              <PieChartTicketsPriority tickets={myTickets as Ticket[]} title="Priorité de mes tickets" />
            </Col>
            <Col sm={12} md={12} lg={12} className="d-flex justify-content-center align-items-center mt-3">
              <TicketsSwimlanes tickets={myTickets as Ticket[]} loading={loading} error={error} />
            </Col>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default MyTicketsList;
