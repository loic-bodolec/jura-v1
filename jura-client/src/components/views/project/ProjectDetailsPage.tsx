import { useQuery } from '@apollo/client';
import { Card, Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { GetOneProjectQuery, GetOneProjectQueryVariables } from '../../../services/api/generated/graphql';
import { GET_ONE_PROJECT } from '../../../services/api/project/project-queries';
import { GET_ALL_TICKETS_BY_PROJECT } from '../../../services/api/ticket/ticket-queries';
import { ProjectStatus } from '../../../services/models/project';
import { FormError } from '../../atomics/form/formError/FormError';
import { Loader } from '../../atomics/loader/Loader';
import { PieChartTicketsPriority } from '../../features/charts/pieChart/PieChartTicketPriority';
import { PieChartTicketsStatus } from '../../features/charts/pieChart/PieChartTicketStatus';
import { ProjectDetailsCard } from '../../projects/projectDetailsCard/ProjectDetailsCard';
import { TicketsSwimlanes } from '../../tickets/TicketsSwimlanes';

const ProjectDetailsPage = () => {
  const { projectId } = useParams();
  const {
    error: projectError,
    loading: projectLoading,
    data: project
  } = useQuery<GetOneProjectQuery, GetOneProjectQueryVariables>(GET_ONE_PROJECT, {
    variables: { getOneProjectId: projectId as string }
  });

  const projectItem = project?.getOneProject;

  const {
    error: ticketError,
    loading: ticketLoading,
    data: tickets
  } = useQuery(GET_ALL_TICKETS_BY_PROJECT, {
    variables: { getAllTicketsByProjectId: projectId }
    // pollInterval: 1000
  });

  const projectTickets = tickets?.getAllTicketsByProject;

  if (projectError) {
    return <FormError error={projectError} message="Erreur lors du chargement des données" />;
  }

  if (projectLoading) {
    return <Loader message=" Chargement des données du projet..." />;
  }

  if (!projectItem) {
    return <FormError error={projectError} message="Projet introuvable" />;
  }

  return (
    <Row className="d-flex justify-content-center align-items-center my-5 mx-1">
      <Row className="d-flex justify-content-center align-items-center">
        <Card style={{ width: '95rem', paddingBottom: '2rem' }} className="flex-row flex-wrap rounded shadow border-0">
          <Col lg={6} md={12} className="d-flex justify-content-center align-items-center my-5">
            <ProjectDetailsCard
              id={projectId}
              name={projectItem!.name}
              status={projectItem!.status as ProjectStatus}
              description={projectItem?.description}
              created_at={projectItem?.created_at}
              delivered_at={projectItem?.delivered_at}
              due_at={projectItem?.due_at}
              owner={projectItem?.owner}
              members={projectItem?.members}
            />
          </Col>
          <Col lg={3} md={6} className="d-flex justify-content-center align-items-center">
            <PieChartTicketsStatus tickets={projectTickets} title="Statut des tickets" showTotal />
          </Col>
          <Col lg={3} md={6} className="d-flex justify-content-center align-items-center">
            <PieChartTicketsPriority tickets={projectTickets} title="Priorité des tickets" />
          </Col>
        </Card>
      </Row>
      <Row className="d-flex justify-content-center align-items-center">
        {projectTickets && (
          <Card style={{ width: '95rem' }} className="d-flex justify-content-center flex-row rounded shadow border-0">
            <Card>
              <Card.Header style={{ fontSize: '1.25rem', marginBottom: '1rem', textAlign: 'center' }}>
                Les tickets de {projectItem!.name}
              </Card.Header>
              <Card.Body>
                <TicketsSwimlanes tickets={projectTickets} loading={ticketLoading} error={ticketError} />
              </Card.Body>
            </Card>
          </Card>
        )}
      </Row>
    </Row>
  );
};

export default ProjectDetailsPage;
