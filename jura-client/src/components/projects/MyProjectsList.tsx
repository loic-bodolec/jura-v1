import { useMutation, useQuery } from '@apollo/client';
import { Card, Col, Row } from 'react-bootstrap';
import { toUpdateProject } from '../../helper/mapper/toUpdateProject';
import { getProjectActions } from '../../helper/project/getActions';
import { GetProfileQuery, GetProfileQueryVariables, Project, UpdateProjectMutationVariables } from '../../services/api/generated/graphql';
import { UPDATE_PROJECT } from '../../services/api/project/project-mutations';
import { GET_ALL_PROJECTS } from '../../services/api/project/project-queries';
import { GET_PROFILE } from '../../services/api/user/user-queries';
import { Action } from '../../services/models/action';
import { ProjectStatus } from '../../services/models/project';
import { FormError } from '../atomics/form/formError/FormError';
import { JuraCard } from '../atomics/juraCard/JuraCard';
import { Loader } from '../atomics/loader/Loader';
import { DoughnutChart } from '../features/charts/doughnutChart/DoughnutChart';

const MyProjectsList = () => {
  const { loading, data, error } = useQuery<GetProfileQuery, GetProfileQueryVariables>(GET_PROFILE);
  const [updateProject, state] = useMutation<UpdateProjectMutationVariables>(UPDATE_PROJECT);

  const onAction = (_action: Action, project: Project) => {
    updateProject({
      variables: {
        projectInput: toUpdateProject(project)
      },
      refetchQueries: [GET_ALL_PROJECTS]
    });
  };

  const myProjects = data?.getProfile.projects;

  if (loading || state.loading) {
    return <Loader message="Chargement de mes projets..." />;
  }

  if (error || state.error) {
    return <FormError error={error || state.error} message="Erreur lors du chargement des données" />;
  }

  return (
    <Row className="mx-1" style={{ height: '100vh' }}>
      <Col className="d-flex flex-column align-items-center">
        <Card style={{ margin: '5rem', maxWidth: '100rem' }}>
          <Card.Header style={{ color: '#2e4acd', fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', textAlign: 'center' }}>
            Mes projets
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
              <DoughnutChart projects={myProjects as Project[]} title="Statut de mes projets" />
            </Col>
            <Col className="d-flex justify-content-center align-items-center mx-0">
              <Card style={{ margin: '1rem', maxWidth: '30rem' }}>
                <Card.Header style={{ fontSize: '1rem', marginBottom: '1rem', textAlign: 'center' }}>Liste de mes projets</Card.Header>
                <Card.Body
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    marginBottom: '1rem',
                    overflowY: 'scroll',
                    maxHeight: '80vh',
                    paddingBottom: '1rem'
                  }}
                >
                  {myProjects?.map((project) => {
                    const actions = getProjectActions(project.status as ProjectStatus);
                    return (
                      <Col key={project.id} className="mt-3 mx-3 d-flex justify-content-center align-items-center">
                        <JuraCard
                          id={project.id}
                          title={project.name}
                          dueDate={new Date(project.due_at)}
                          status={project?.status as ProjectStatus}
                          members={project.members?.map((m) => m.id) ?? []}
                          actions={actions}
                          onAction={onAction}
                          item={project as Project}
                        />
                      </Col>
                    );
                  })}
                </Card.Body>
              </Card>
            </Col>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default MyProjectsList;
