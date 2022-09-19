import { Card, Col, Row } from 'react-bootstrap';
import { getStatusTranslation } from '../../../helper/translation/getStatus';
import { Project, Ticket } from '../../../services/api/generated/graphql';
import { Action } from '../../../services/models/action';
import { ProjectStatus } from '../../../services/models/project';
import { TicketPriority } from '../../../services/models/ticket';
import { DateBadge } from '../dateBadge/DateBadge';
import { Ellipsis } from '../ellipsis/Ellipsis';
import { getPriorityIcon } from '../icon/Icon';
import { Link } from '../link/Link';
import { Members } from '../member/Members';

export type JuraCardProps = {
  id: string;
  priority?: TicketPriority;
  title: string;
  status: ProjectStatus;
  dueDate: Date;
  members?: string[];
  actions?: Action[];
  onAction: (action: Action, project: Project) => void;
  item: Project | Ticket;
};

export const JuraCard = ({ id, priority, title, dueDate, status, members, actions, onAction, item }: JuraCardProps) => {
  const cardId = `juraCard-${id}`;

  return (
    <Card data-testid={cardId} style={{ width: '20rem' }} className="rounded shadow border-0">
      <Card.Body>
        <section className="d-flex justify-content-between">
          {getPriorityIcon(priority)}
          {actions && <Ellipsis actions={actions} onAction={onAction} element={item} />}
        </section>
        <Card.Title data-testid={`${cardId}-title`} className="text-center mb-3">
          <Link to={`/projects/${id}`} title={title} />
        </Card.Title>
        <Row className="d-flex justify-content-between">
          <Col>
            <DateBadge dueDate={dueDate} />
          </Col>
          <Col>
            <Card.Text data-testid={`${cardId}-status`} style={{ display: 'flex', justifyContent: 'center' }}>
              {getStatusTranslation(status).toLowerCase()}
            </Card.Text>
          </Col>
          <Col>
            <Members members={members} />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
