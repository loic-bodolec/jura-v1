import { useQuery } from '@apollo/client';
import { Card, Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { GET_ONE_USER } from '../../../services/api/user/user-queries';
import { FormError } from '../../atomics/form/formError/FormError';
import { Loader } from '../../atomics/loader/Loader';
import { PieChartTicketsStatus } from '../../features/charts/pieChart/PieChartTicketStatus';
import { TicketsSwimlanes } from '../../tickets/TicketsSwimlanes';
import { UserDetailsCard } from '../../users/userDetailsCard/UserDetailsCard';

const UserDetailsPage = () => {
  const { userId } = useParams();
  const { error, loading, data } = useQuery(GET_ONE_USER, {
    variables: { getOneUserId: userId }
    // pollInterval: 1000
  });

  const userTickets = data?.getOneUser.tickets;

  if (error) {
    return <FormError error={error} message="Erreur lors du chargement des données" />;
  }

  if (loading) {
    return <Loader message=" Chargement des données de l'utilisateur..." />;
  }

  return (
    <Row className="d-flex justify-content-center align-items-center my-5 mx-1">
      {userTickets && (
        <>
          <Row className="d-flex justify-content-center align-items-center">
            <Card style={{ width: '95rem' }} className="flex-row flex-wrap rounded shadow border-0">
              <Col className="d-flex justify-content-center align-items-center my-5">
                <UserDetailsCard
                  id={data?.getOneUser.id}
                  firstname={data.getOneUser.firstname}
                  lastname={data?.getOneUser.lastname}
                  job_title={data?.getOneUser.job_title}
                  email={data?.getOneUser.email}
                  projects={data?.getOneUser.projects}
                />
              </Col>
              <Col className="d-flex justify-content-center align-items-center my-5">
                <PieChartTicketsStatus
                  tickets={userTickets}
                  title={`Statut des tickets de ${data?.getOneUser.firstname ? data?.getOneUser.firstname : 'ce membre'}`}
                  showTotal
                />
              </Col>
            </Card>
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            {data && (
              <Card style={{ width: '95rem' }} className="flex-row flex-wrap rounded shadow border-0">
                <Card>
                  <Card.Header style={{ fontSize: '1.25rem', marginBottom: '1rem', textAlign: 'center' }}>
                    Les tickets de {data?.getOneUser.firstname ? data?.getOneUser.firstname : 'ce membre'}
                  </Card.Header>
                  <Card.Body>
                    <TicketsSwimlanes tickets={userTickets} loading={loading} error={error} />
                  </Card.Body>
                </Card>
              </Card>
            )}
          </Row>
        </>
      )}
    </Row>
  );
};

export default UserDetailsPage;
