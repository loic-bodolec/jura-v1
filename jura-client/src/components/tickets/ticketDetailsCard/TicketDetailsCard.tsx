import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { Button, Card, Col, ListGroup, OverlayTrigger } from 'react-bootstrap';
import { GrUpdate } from 'react-icons/gr';
import { popoverHoverFocus } from '../../../helper/popover/popoverHoverFocus';
import { getPriorityTranslation } from '../../../helper/translation/getPriority';
import { GetProfileQuery, GetProfileQueryVariables, Ticket, User } from '../../../services/api/generated/graphql';
import { GET_PROFILE } from '../../../services/api/user/user-queries';
import { TicketPriority } from '../../../services/models/ticket';
import { DateBadge } from '../../atomics/dateBadge/DateBadge';
import { getPriorityIcon } from '../../atomics/icon/Icon';
import { Link } from '../../atomics/link/Link';
import { UpdateTicketModal } from '../../features/ticket/UpdateTicketModal';

export interface TicketDetailsCardProps {
  ticketInfo: Ticket;
}

export const TicketDetailsCard = ({ ticketInfo }: TicketDetailsCardProps) => {
  const cardId = `ticketDetailsCard-${ticketInfo.id}`;

  const { loading: profileLoading, error: errorProfile, data: profile } = useQuery<GetProfileQuery, GetProfileQueryVariables>(GET_PROFILE);

  const userID = profile?.getProfile.id;

  const [showUpdateTicketModal, setShowUpdateTicketModal] = useState<boolean>(false);

  return (
    <>
      <Col sm={12} md={12} className="d-flex flex-column justify-content-center align-items-center">
        <Card data-testid={cardId} className="ticket-card">
          <Card.Header
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap'
            }}
          >
            <Card.Subtitle data-testid={`${cardId}-priority-icon`}>{getPriorityIcon(ticketInfo?.priority as TicketPriority)}</Card.Subtitle>
            <Card.Subtitle data-testid={`${cardId}-title`} style={{ maxWidth: '25rem' }}>
              {ticketInfo?.title}
            </Card.Subtitle>
            <DateBadge dueDate={new Date(ticketInfo?.due_date)} />
          </Card.Header>
          <Card.Body className="ticket-information">
            <Card.Text data-testid={`${cardId}-id`} style={{ fontSize: '1rem', marginBottom: '1rem' }}>
              N° : {ticketInfo?.id}
            </Card.Text>
            <Card.Text data-testid={`${cardId}-project-name`} style={{ fontSize: '1rem', marginBottom: '1rem' }}>
              Projet : <Link to={`/projects/${ticketInfo?.project.id}`} title={`${ticketInfo?.project.name}`} />
            </Card.Text>
            <Card.Text data-testid={`${cardId}-status`} style={{ fontSize: '1rem', marginBottom: '1rem' }}>
              Statut : {ticketInfo?.status}
            </Card.Text>
            <Card.Text data-testid={`${cardId}-priority`} style={{ fontSize: '1rem', marginBottom: '1rem' }}>
              Priorité : {getPriorityTranslation(ticketInfo?.priority as TicketPriority).toLowerCase()}
            </Card.Text>
            <Card.Text data-testid={`${cardId}-description`} style={{ fontSize: '1rem', marginBottom: '1rem' }}>
              Description : {ticketInfo?.description}
            </Card.Text>
            <Card.Text data-testid={`${cardId}-created-date`} style={{ fontSize: '1rem', marginBottom: '1rem' }}>
              Création : {new Date(ticketInfo?.created_at).toLocaleDateString('fr-FR')}
            </Card.Text>
            <Card.Text data-testid={`${cardId}-created-by`} style={{ fontSize: '1rem', marginBottom: '1rem' }}>
              Créé par :{' '}
              <Link
                to={`/users/${ticketInfo?.created_by.id}`}
                title={`${ticketInfo?.created_by.firstname} ${ticketInfo?.created_by.lastname}`}
              />
            </Card.Text>
            <Card.Text data-testid={`${cardId}-estimated-time`} style={{ fontSize: '1rem', marginBottom: '1rem' }}>
              Temps estimé : {ticketInfo?.estimated_time} h
            </Card.Text>
            <Card.Text data-testid={`${cardId}-spent-time`} style={{ fontSize: '1rem', marginBottom: '1rem' }}>
              Temps passé : {ticketInfo?.spent_time} h
            </Card.Text>
            <Card.Subtitle data-testid={`${cardId}-users`} style={{ fontSize: '1rem', marginTop: '1rem', marginBottom: '1rem' }}>
              Attribué à :{' '}
            </Card.Subtitle>
            {ticketInfo?.users && (
              <ListGroup
                data-testid={`${cardId}-members-list`}
                style={{ display: 'flex', flexDirection: 'row', fontSize: '1rem', flexWrap: 'wrap' }}
              >
                {ticketInfo?.users.map((member: Partial<User>) => (
                  <ListGroup.Item
                    key={member.id}
                    data-testid={`${cardId}-members-item`}
                    style={{ margin: '0.25rem', borderRadius: '1rem' }}
                  >
                    <Link to={`/users/${member.id}`} title={`${member.firstname} ${member.lastname}`} />
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Card.Body>
          <Card.Footer data-testid={`${cardId}-footer`}>
            {ticketInfo?.created_by.id === userID && (
              <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={popoverHoverFocus('mettre à jour')}>
                <Button
                  data-testid={`${cardId}-update-button`}
                  className="mx-0"
                  variant="outline-success"
                  size="sm"
                  onClick={() => setShowUpdateTicketModal(!showUpdateTicketModal)}
                >
                  <GrUpdate />
                </Button>
              </OverlayTrigger>
            )}
          </Card.Footer>
        </Card>
        {showUpdateTicketModal && <UpdateTicketModal ticket={ticketInfo} close={() => setShowUpdateTicketModal(false)} />}
      </Col>
    </>
  );
};
