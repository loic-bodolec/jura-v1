// TODO update members on a project (work in progress...)

import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { Button, Card, FloatingLabel, Form, OverlayTrigger } from 'react-bootstrap';
import { GrSend } from 'react-icons/gr';
import { popoverHoverFocus } from '../../../helper/popover/popoverHoverFocus';
import { MutationUpdateProjectArgs } from '../../../services/api/generated/graphql';
import { UPDATE_PROJECT } from '../../../services/api/project/project-mutations';
import { FormError } from '../../atomics/form/formError/FormError';
import { Loader } from '../../atomics/loader/Loader';
import { JuraModal } from '../../atomics/modal/CustomModal';

// TODO fix UpdateProjectModalProps
type UpdateProjectModalProps = {
  close: () => void;
  projectId: string | null | undefined;
  projectName: string;
  projectStatus: string;
  projectDescription: string | null | undefined;
  projectDueAt: any;
};

export const UpdateProjectModal = ({
  projectId,
  projectName,
  projectStatus,
  projectDescription,
  projectDueAt,
  close
}: UpdateProjectModalProps) => {
  const [updatedProject, setUpdateProject] = useState({
    id: projectId,
    name: projectName,
    status: projectStatus,
    description: projectDescription,
    due_at: projectDueAt
  });

  const [updateProject, { loading, error }] = useMutation<MutationUpdateProjectArgs>(UPDATE_PROJECT);

  function refresh() {
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }

  const updateTheProject = () => {
    updateProject({
      variables: {
        projectInput: {
          id: updatedProject.id,
          name: updatedProject.name,
          status: updatedProject.status,
          description: updatedProject.description,
          due_at: updatedProject.due_at
        }
      },
      notifyOnNetworkStatusChange: true,
      onCompleted: () => refresh()
    });
  };

  return (
    <JuraModal close={close} title="Mise à jour du projet">
      <>
        <Card.Body>
          <Form>
            <FloatingLabel controlId="floatingInput" label="Nom du projet" className="mb-10">
              <Form.Control
                className="my-2 border-primary"
                value={updatedProject.name}
                name="name"
                onChange={(e) => {
                  setUpdateProject({ ...updatedProject, name: e.target.value });
                }}
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="Statut" className="mb-10">
              <Form.Select
                value={updatedProject.status}
                className="my-2 border-primary"
                name="status"
                onChange={(e) => {
                  setUpdateProject({ ...updatedProject, status: e.target.value });
                }}
              >
                <option value="OPEN">en cours</option>
                <option value="CLOSED">clos</option>
              </Form.Select>
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="Description" className="mb-10">
              <Form.Control
                as="textarea"
                className="my-2 border-primary"
                value={updatedProject?.description ?? ''}
                name="description"
                onChange={(e) => {
                  setUpdateProject({ ...updatedProject, description: e.target.value });
                }}
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="Echéance" className="mb-10">
              <Form.Control
                type="date"
                className="my-2 border-primary"
                value={updatedProject?.due_at}
                name="due_at"
                onChange={(e) => {
                  setUpdateProject({ ...updatedProject, due_at: e.target.value });
                }}
              />
            </FloatingLabel>
          </Form>
          <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={popoverHoverFocus('envoyer')}>
            <Button className="mx-0" variant="outline-primary" size="sm" style={{ marginTop: '1rem' }} onClick={() => updateTheProject()}>
              <GrSend />
            </Button>
          </OverlayTrigger>
        </Card.Body>
        {loading && <Loader message="Chargement..." />}
        {error && <FormError error={error} message="Une erreur s'est produite!" />}
      </>
    </JuraModal>
  );
};
