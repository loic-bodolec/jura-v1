import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { Button, Card, Col, ListGroup, OverlayTrigger } from 'react-bootstrap';
import { GrUpdate } from 'react-icons/gr';
import { popoverHoverFocus } from '../../../helper/popover/popoverHoverFocus';
import { getStatusTranslation } from '../../../helper/translation/getStatus';
import { GetProfileQuery, GetProfileQueryVariables, User } from '../../../services/api/generated/graphql';
import { GET_PROFILE } from '../../../services/api/user/user-queries';
import { ProjectStatus } from '../../../services/models/project';
import { DateBadge } from '../../atomics/dateBadge/DateBadge';
import { Link } from '../../atomics/link/Link';
import { UpdateProjectModal } from '../../features/project/UpdateProjectModal';

export interface ProjectDetailsCardProps {
  id: string | undefined;
  name: string;
  status: ProjectStatus;
  description: string | null | undefined;
  created_at: Date;
  delivered_at?: Date;
  due_at: Date;
  owner: Member | null | undefined;
  members: Array<Member> | null | undefined;
}

export type Member = {
  id: string;
  firstname: string;
  lastname: string;
};

// TODO ProjectDetailsCard should be tested
export const ProjectDetailsCard = ({
  id,
  name,
  status,
  description,
  created_at,
  delivered_at,
  due_at,
  owner,
  members
}: ProjectDetailsCardProps) => {
  const cardId = `ProjectDetailsCard-${id}`;

  const { loading: profileLoading, error: errorProfile, data: profile } = useQuery<GetProfileQuery, GetProfileQueryVariables>(GET_PROFILE);

  const userID = profile?.getProfile.id;

  const [showUpdateProjectModal, setShowUpdateProjectModal] = useState<boolean>(false);

  return (
    <>
      <Col sm={12} md={12} className="d-flex flex-column justify-content-center align-items-center">
        <Card data-testid={cardId} className="project-card" style={{ maxWidth: '40rem' }}>
          <Card.Header
            data-testid={`${cardId}-name`}
            style={{ color: '#2e4acd', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', textAlign: 'center' }}
          >
            {name}
          </Card.Header>
          <Card.Body className="project-information">
            <DateBadge dueDate={new Date(due_at)} />
            <Card.Text data-testid={`${cardId}-status`} style={{ fontSize: '1rem', marginTop: '1rem', marginBottom: '1rem' }}>
              Statut : {getStatusTranslation(status).toLowerCase()}
            </Card.Text>
            <Card.Text data-testid={`${cardId}-owner`} style={{ fontSize: '1rem', marginBottom: '1rem' }}>
              Responsable : <Link to={`/users/${owner?.id}`} title={`${owner?.firstname} ${owner?.lastname}`} />
            </Card.Text>
            <Card.Text data-testid={`${cardId}-description`} style={{ fontSize: '1rem', marginBottom: '1rem' }}>
              Description : {description}
            </Card.Text>
            <Card.Text data-testid={`${cardId}-created-at`} style={{ fontSize: '1rem', marginBottom: '1rem' }}>
              Création : {new Date(created_at).toLocaleDateString('fr-FR')}
            </Card.Text>
            <Card.Text data-testid={`${cardId}-delivered-at`} style={{ fontSize: '1rem', marginBottom: '1rem' }}>
              Livraison le : {delivered_at && new Date(delivered_at).toLocaleDateString('fr-FR')}
            </Card.Text>
            <Card.Subtitle style={{ fontSize: '1rem', marginTop: '1rem', marginBottom: '1rem' }}>Membres : </Card.Subtitle>
            {members && (
              <ListGroup
                data-testid={`${cardId}-members-list`}
                style={{ display: 'flex', flexDirection: 'row', fontSize: '1rem', flexWrap: 'wrap' }}
              >
                {members.map((member: Partial<User>) => (
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
            {owner?.id === userID && (
              <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={popoverHoverFocus('mettre à jour')}>
                <Button
                  data-testid={`${cardId}-update-button`}
                  className="mx-0"
                  variant="outline-success"
                  size="sm"
                  onClick={() => setShowUpdateProjectModal(!showUpdateProjectModal)}
                >
                  <GrUpdate />
                </Button>
              </OverlayTrigger>
            )}
          </Card.Footer>
        </Card>
        {showUpdateProjectModal && (
          <UpdateProjectModal
            projectId={id}
            projectName={name}
            projectStatus={status}
            projectDescription={description}
            projectDueAt={due_at}
            close={() => setShowUpdateProjectModal(false)}
          />
        )}
      </Col>
    </>
  );
};
