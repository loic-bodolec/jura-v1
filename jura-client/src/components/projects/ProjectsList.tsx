import { useMutation, useQuery } from '@apollo/client';
import { Card, Col, Row } from 'react-bootstrap';
import { toProjectDeliveryDatesData } from '../../helper/mapper/toProjectDeliveryDatesData';
import { toUpdateProject } from '../../helper/mapper/toUpdateProject';
import { getProjectActions } from '../../helper/project/getActions';
import {
  GetAllProjectsDeliveryDateQuery,
  GetAllProjectsDeliveryDateQueryVariables,
  GetAllProjectsQuery,
  GetAllProjectsQueryVariables,
  GetAllTicketsQuery,
  GetAllTicketsQueryVariables,
  Project,
  Ticket,
  UpdateProjectMutationVariables
} from '../../services/api/generated/graphql';
import { UPDATE_PROJECT } from '../../services/api/project/project-mutations';
import { GET_ALL_PROJECTS, GET_ALL_PROJECTS_DELIVERY_DATE } from '../../services/api/project/project-queries';
import { GET_ALL_TICKETS } from '../../services/api/ticket/ticket-queries';
import { Action } from '../../services/models/action';
import { ProjectStatus } from '../../services/models/project';
import { ErrorSection } from '../atomics/error/ErrorSection';
import { FormError } from '../atomics/form/formError/FormError';
import { JuraCard } from '../atomics/juraCard/JuraCard';
import { Loader } from '../atomics/loader/Loader';
import { JuraModal } from '../atomics/modal/CustomModal';
import { BarChart } from '../features/charts/barGraph/BarChart';
import { DoughnutChart } from '../features/charts/doughnutChart/DoughnutChart';
import { PieChartTicketsPriority } from '../features/charts/pieChart/PieChartTicketPriority';
import { PieChartTicketsStatus } from '../features/charts/pieChart/PieChartTicketStatus';

export const ProjectsList = () => {
  const { loading, data, error } = useQuery<GetAllProjectsQuery, GetAllProjectsQueryVariables>(GET_ALL_PROJECTS);
  const {
    loading: ticketLoading,
    data: ticketData,
    error: ticketError
  } = useQuery<GetAllTicketsQuery, GetAllTicketsQueryVariables>(GET_ALL_TICKETS);
  const {
    data: deliveryDates,
    error: deliveryDatesError,
    loading: deliveryDatesLoading
  } = useQuery<GetAllProjectsDeliveryDateQuery, GetAllProjectsDeliveryDateQueryVariables>(GET_ALL_PROJECTS_DELIVERY_DATE);
  const [updateProject, state] = useMutation<UpdateProjectMutationVariables>(UPDATE_PROJECT);

  const onAction = (_action: Action, project: Project) => {
    updateProject({
      variables: {
        projectInput: toUpdateProject(project)
      },
      refetchQueries: [GET_ALL_PROJECTS]
    });
  };

  const projectsList = data?.getAllProjects;
  const ticketsList = ticketData?.getAllTickets;

  if (loading || ticketLoading || state.loading || deliveryDatesLoading) {
    return <Loader message="Chargement des données..." />;
  }

  if (error || ticketError || deliveryDatesError) {
    return <FormError error={error || ticketError || deliveryDatesError} message="Erreur lors du chargement des données" />;
  }

  if (state.error) {
    return (
      <JuraModal close={state.reset}>
        <ErrorSection
          errorMessage={state.error.message}
          cancel={state.reset}
          retry={() =>
            updateProject({
              variables: { projectInput: state.error?.graphQLErrors[0].extensions.exception.itemId },
              refetchQueries: [GET_ALL_PROJECTS]
            })
          }
        />
      </JuraModal>
    );
  }

  if (!projectsList || !ticketsList) {
    return <FormError message="Aucun projet trouvé!" />;
  }

  return (
    <Row>
      <Col className="d-flex flex-column align-items-center mx-0">
        <Card style={{ margin: '5rem' }}>
          <Card.Header style={{ color: '#2e4acd', fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', textAlign: 'center' }}>
            Tableau de bord
          </Card.Header>
          <Card.Body
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '1rem',
              paddingBottom: '1rem'
            }}
          >
            <Row className="mx-1">
              <Col className="d-flex flex-column align-items-center mx-1">
                <Card style={{ marginBottom: '3rem', maxWidth: '70rem' }}>
                  <Card.Header style={{ fontSize: '1rem', marginBottom: '1rem', textAlign: 'center' }}>Liste des projets</Card.Header>
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
                    {projectsList &&
                      projectsList?.map((p) => {
                        const actions = getProjectActions(p.status);
                        return (
                          <Col key={p.id} className="mt-3 d-flex justify-content-center align-items-center">
                            <JuraCard
                              id={p.id}
                              title={p.name}
                              dueDate={new Date(p.due_at)}
                              status={p.status as ProjectStatus}
                              members={p.members?.map((m) => m.id) ?? []}
                              actions={actions}
                              onAction={onAction}
                              item={p as Project}
                            />
                          </Col>
                        );
                      })}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            {deliveryDates && (
              <Row className="d-flex justify-content-center align-items-center mx-1">
                <BarChart
                  delivery={toProjectDeliveryDatesData((deliveryDates?.getAllProjects as { delivered_at: Date }[]) ?? [])}
                  title="Projets livrés par mois"
                />
              </Row>
            )}
            <Row className="d-flex justify-content-center align-items-center mx-1">
              {projectsList && (
                <Col className="d-flex justify-content-center align-items-center">
                  <DoughnutChart projects={projectsList as Project[]} title="Statut des projets" />
                </Col>
              )}
              {ticketsList && (
                <>
                  <Col className="d-flex justify-content-center align-items-center">
                    <PieChartTicketsStatus tickets={ticketsList as Ticket[]} title="Statut des tickets" showTotal />
                  </Col>
                  <Col className="d-flex justify-content-center align-items-center">
                    <PieChartTicketsPriority tickets={ticketsList as Ticket[]} title="Priorité des tickets" />
                  </Col>
                </>
              )}
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};
