import { useMutation, useQuery } from '@apollo/client';
import { Button, Card, Col, OverlayTrigger, Row } from 'react-bootstrap';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { popoverHoverFocus } from '../../helper/popover/popoverHoverFocus';
import {
  GetAllTicketsQuery,
  GetAllTicketsQueryVariables,
  GetProfileQuery,
  GetProfileQueryVariables,
  MutationDeleteTicketArgs
} from '../../services/api/generated/graphql';
import { DELETE_TICKET } from '../../services/api/ticket/ticket-mutations';
import { GET_ALL_TICKETS } from '../../services/api/ticket/ticket-queries';
import { GET_PROFILE } from '../../services/api/user/user-queries';
import { FormError } from '../atomics/form/formError/FormError';
import { Link } from '../atomics/link/Link';
import { Loader } from '../atomics/loader/Loader';

function ArchivedTicketsList() {
  const {
    loading: ticketLoading,
    data: ticketData,
    error: ticketError
  } = useQuery<GetAllTicketsQuery, GetAllTicketsQueryVariables>(GET_ALL_TICKETS);

  const archivedTickets = ticketData?.getAllTickets?.filter((ticket) => ticket?.status === 'à archiver');

  const { loading: profileLoading, error: errorProfile, data: profile } = useQuery<GetProfileQuery, GetProfileQueryVariables>(GET_PROFILE);

  const userID = profile?.getProfile.id;

  const [removeTicket, state] = useMutation<MutationDeleteTicketArgs>(DELETE_TICKET);

  const deleteTicket = (ticketId: string) => {
    removeTicket({
      variables: { deleteTicketId: ticketId },
      notifyOnNetworkStatusChange: true,
      refetchQueries: [GET_ALL_TICKETS]
    });
  };

  if (ticketLoading || state.loading) {
    return <Loader message="Chargement des tickets..." />;
  }

  if (ticketError || state.error) {
    return <FormError error={state.error} message="Erreur lors du chargement des données" />;
  }

  if (!archivedTickets) {
    return <FormError error={ticketError} message={`Vous n'avez pas de tickets archivés`} />;
  }

  return (
    <Row className="mx-1" style={{ height: '100vh' }}>
      <Col className="d-flex flex-column align-items-center">
        <Card style={{ margin: '5rem', maxWidth: '100rem' }}>
          <Card.Header style={{ color: '#2e4acd', fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', textAlign: 'center' }}>
            Liste des tickets archivés
          </Card.Header>
          <Card.Body
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              marginBottom: '1rem',
              overflowY: 'scroll',
              maxHeight: '70vh',
              paddingBottom: '1rem'
            }}
          >
            {archivedTickets &&
              archivedTickets.map((ticket: any) => {
                return (
                  <Card key={ticket.id} style={{ width: '20rem' }} className="rounded shadow border-0 my-2 mx-2">
                    <Card.Header>
                      <Link to={`/tickets/${ticket?.id}`} title={ticket?.title} />
                    </Card.Header>
                    <Card.Body>
                      <div>n° : {ticket.id}</div>
                      <div>
                        créé par :{' '}
                        <Link
                          to={`/users/${ticket.created_by?.id}`}
                          title={`${ticket.created_by?.firstname} ${ticket.created_by?.lastname}`}
                        />
                      </div>
                      <div>
                        projet : <Link to={`/projects/${ticket.project?.id}`} title={ticket.project?.name} />
                      </div>
                    </Card.Body>
                    {ticket.created_by?.id === userID && (
                      <Card.Footer>
                        <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={popoverHoverFocus('supprimer')}>
                          <Button className="my-0" variant="outline-danger" size="sm" onClick={() => deleteTicket(ticket.id)}>
                            <RiDeleteBin5Line style={{ color: 'black' }} />
                          </Button>
                        </OverlayTrigger>
                      </Card.Footer>
                    )}
                  </Card>
                );
              })}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default ArchivedTicketsList;
