import { Card, ListGroup } from 'react-bootstrap';
import { getStatusTranslation } from '../../../helper/translation/getStatus';
import { ProjectStatus } from '../../../services/models/project';
import { Link } from '../../atomics/link/Link';

export interface UserDetailsCardProps {
  id: string;
  firstname: string;
  lastname: string;
  job_title: string;
  email: string;
  projects: Array<Project>;
}

export type Project = {
  id: string;
  name: string;
  status: ProjectStatus;
};

export const UserDetailsCard = ({ id, firstname, lastname, job_title, email, projects }: UserDetailsCardProps) => {
  const cardId = `userDetailsCard-${id}`;

  return (
    <Card data-testid={cardId} style={{ maxWidth: '25rem' }}>
      <Card.Header as="h4" data-testid={`${cardId}-name`} style={{ color: '#2e4acd', fontWeight: 'bold', textAlign: 'center' }}>
        {firstname} {lastname}
      </Card.Header>
      <Card.Body className="user-information">
        <Card.Subtitle className="mb-3" data-testid={`${cardId}-email`}>
          Email : {email}
        </Card.Subtitle>
        <Card.Subtitle className="mb-3" data-testid={`${cardId}-job`}>
          Fonction : {job_title}
        </Card.Subtitle>
        <Card.Subtitle className="mb-5" data-testid={`${cardId}-projects-length`}>
          Chef de projet(s) : {projects.length}
        </Card.Subtitle>
        <Card.Subtitle data-testid={`${cardId}-projects-list`}>
          {' '}
          {projects && (
            <ListGroup>
              {projects.map((project: Project) => (
                <ListGroup.Item
                  key={project.id}
                  data-testid={`${cardId}-projects-item`}
                  style={{ margin: '0.25rem', borderRadius: '1rem' }}
                >
                  <Link to={`/projects/${project.id}`} title={`${project.name} (${getStatusTranslation(project.status).toLowerCase()})`} />
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Card.Subtitle>
      </Card.Body>
    </Card>
  );
};
