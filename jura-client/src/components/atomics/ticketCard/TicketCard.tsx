import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import { Button, ButtonToolbar, Card, Form, ListGroup, OverlayTrigger } from 'react-bootstrap';
import { GrSend, GrUpdate } from 'react-icons/gr';
import { RiArrowGoBackLine, RiDeleteBin5Line } from 'react-icons/ri';
import { popoverHoverFocus } from '../../../helper/popover/popoverHoverFocus';
import { getPriorityTranslation } from '../../../helper/translation/getPriority';
import { MutationDeleteTicketArgs, MutationUpdateTicketArgs, UpdateTicketInput } from '../../../services/api/generated/graphql';
import { DELETE_TICKET, UPDATE_TICKET } from '../../../services/api/ticket/ticket-mutations';
import { GET_PROFILE } from '../../../services/api/user/user-queries';
import { TicketPriority } from '../../../services/models/ticket';
import { DateBadge } from '../dateBadge/DateBadge';
import { FormError } from '../form/formError/FormError';
import { Link } from '../link/Link';
import { Loader } from '../loader/Loader';

export interface TicketCardProps {
  id: string;
  status: string;
  priority: TicketPriority;
  description?: string;
  title: string;
  due_date: Date;
  estimated_time: number;
  created_by: Partial<User>;
  users: Array<User>;
}

export type User = {
  id: string;
  firstname: string;
  lastname: string;
};

export const TicketCard = ({ id, status, priority, title, due_date, estimated_time, created_by, users }: TicketCardProps) => {
  const cardId = `ticketCard-${id}`;

  const { loading: profileLoading, error: errorProfile, data: profile } = useQuery(GET_PROFILE);

  const userID = profile?.getProfile.id;

  const [update, setUpdate] = useState(false);
  const [updatedTicketStatus, setUpdateTicketStatus] = useState<string | undefined>();

  function refresh() {
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }

  const [updateTicket, { data }] = useMutation<UpdateTicketInput, MutationUpdateTicketArgs>(UPDATE_TICKET);

  const onChange = (e: any) => {
    setUpdateTicketStatus(e.target.value);
  };

  const updateTheTicket = (ticketId: string) => {
    updateTicket({
      variables: {
        ticketInput: {
          id: ticketId,
          status: updatedTicketStatus
        }
      },
      notifyOnNetworkStatusChange: true,
      onCompleted: () => refresh()
    });
    setUpdate(false);
  };

  const [removeTicket, state] = useMutation<MutationDeleteTicketArgs>(DELETE_TICKET);

  const deleteTicket = (ticketId: string) => {
    removeTicket({
      variables: { deleteTicketId: ticketId },
      notifyOnNetworkStatusChange: true,
      onCompleted: () => refresh()
    });
  };

  return (
    <div className="ticket-card-container" style={{ marginBottom: '1rem' }}>
      <Card data-testid={cardId} style={{ width: '20rem' }} className="rounded shadow border-0 my-2 mx-2">
        <Card.Header
          data-testid={`${cardId}-title-status`}
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
        >
          <div className="title" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Card.Text data-testid={`${cardId}-title`} style={{ fontWeight: 'bold' }}>
              <Link to={`/tickets/${id}`} title={title} />
            </Card.Text>
            {!update && created_by.id === userID && (
              <Card.Text data-testid={`${cardId}-status`}>
                {data?.status ?? status}
                <GrUpdate style={{ marginLeft: '1rem' }} onClick={() => setUpdate(true)} />
              </Card.Text>
            )}
          </div>
          {update && (
            <>
              <Form.Select value={updatedTicketStatus ?? status} name="status" style={{ marginTop: '1rem' }} onChange={onChange}>
                <option value="à faire">à faire</option>
                <option value="en cours">en cours</option>
                <option value="à valider">à valider</option>
                <option value="clos">clos</option>
                <option value="à archiver">à archiver</option>
              </Form.Select>
              <ButtonToolbar className="my-1">
                <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={popoverHoverFocus('envoyer')}>
                  <Button className="mx-0" variant="primary" size="sm" onClick={() => updateTheTicket(id)}>
                    <GrSend />
                  </Button>
                </OverlayTrigger>
                <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={popoverHoverFocus('annuler')}>
                  <Button className="mx-2" variant="danger" size="sm" onClick={() => setUpdate(false)}>
                    <RiArrowGoBackLine />
                  </Button>
                </OverlayTrigger>
              </ButtonToolbar>
            </>
          )}
        </Card.Header>
        <Card.Body>
          <Card.Subtitle data-testid={`${cardId}-due-date`} className="mb-4">
            <DateBadge dueDate={due_date} />
          </Card.Subtitle>
          <Card.Subtitle data-testid={`${cardId}-id`} className="mb-2">
            n° : {id}
          </Card.Subtitle>
          <Card.Subtitle data-testid={`${cardId}-priority`} className="mb-2">
            priorité : {getPriorityTranslation(priority as TicketPriority).toLowerCase()}
          </Card.Subtitle>
          <Card.Subtitle data-testid={`${cardId}-estimated-time`} className="mb-2">
            temps estimé : {estimated_time} h
          </Card.Subtitle>
          <Card.Subtitle data-testid={`${cardId}-users`} className="mb-2">
            attribution :
          </Card.Subtitle>
          <ListGroup style={{ display: 'flex', flexDirection: 'row', fontSize: '1rem', flexWrap: 'wrap' }}>
            {users.map((user: Partial<User>) => (
              <ListGroup.Item key={user.id} data-testid={`${cardId}-item`} style={{ margin: '0.25rem', borderRadius: '1rem' }}>
                <Link to={`/users/${user.id}`} title={`${user.firstname} ${user.lastname}`} />
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
        <Card.Footer data-testid={`${cardId}-footer`}>
          {created_by.id === userID && (
            <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={popoverHoverFocus('supprimer')}>
              <Button data-testid={`${cardId}-delete-button`} size="sm" variant="outline-danger" onClick={() => deleteTicket(id)}>
                <RiDeleteBin5Line style={{ color: 'black' }} />
              </Button>
            </OverlayTrigger>
          )}
        </Card.Footer>
      </Card>
      {state.loading && <Loader message="Chargement des tickets..." />}
      {state.error && <FormError error={state.error} message="Une erreur s'est produite!" />}
    </div>
  );
};
