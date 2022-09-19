// TODO update members on a ticket (work in progress...)

import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import { Button, Card, FloatingLabel, Form, OverlayTrigger } from 'react-bootstrap';
import { GrSend } from 'react-icons/gr';
import { toFormSelectionElementArg, toMemberFormSelectionElement } from '../../../helper/mapper/toFormSelectionElement';
import { popoverHoverFocus } from '../../../helper/popover/popoverHoverFocus';
import { GetOneProjectQuery, MutationUpdateTicketArgs } from '../../../services/api/generated/graphql';
import { GET_ONE_PROJECT } from '../../../services/api/project/project-queries';
import { UPDATE_TICKET } from '../../../services/api/ticket/ticket-mutations';
import { FormError } from '../../atomics/form/formError/FormError';
import { Loader } from '../../atomics/loader/Loader';
import { JuraModal } from '../../atomics/modal/CustomModal';
import { MembersDropdown } from '../project/MembersDropdown';

type UpdateTicketModalProps = {
  close: () => void;
  ticket: any;
};

export const UpdateTicketModal = ({ ticket, close }: UpdateTicketModalProps) => {
  const [updatedTicket, setUpdateTicket] = useState({
    status: ticket.status,
    priority: ticket.priority,
    description: ticket.description,
    title: ticket.title,
    due_date: ticket.due_date,
    estimated_time: ticket.estimated_time,
    spent_time: ticket.spent_time
  });
  const [membersIds, setMembersIds] = useState<string[]>([]);

  const {
    error: projectError,
    loading: projectLoading,
    data: project
  } = useQuery<GetOneProjectQuery>(GET_ONE_PROJECT, {
    variables: { getOneProjectId: ticket?.project.id }
  });

  const projectItem = project?.getOneProject;

  const [updateTicket, { loading, error }] = useMutation<MutationUpdateTicketArgs>(UPDATE_TICKET);
  // const [updateUsersFromTicket, { loading: userloading, error: userError }] =
  //   useMutation<MutationUpdateUsersFromTicketArgs>(UPDATE_USERS_FROM_TICKET);

  // const onChange = (e: any) => {
  //   setUpdateTicket({ ...updatedTicket, [e.target.name]: e.target.value });
  // };

  function refresh() {
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }

  const updateTheTicket = () => {
    updateTicket({
      variables: {
        ticketInput: {
          id: ticket.id,
          title: updatedTicket.title,
          status: updatedTicket.status,
          priority: updatedTicket.priority,
          description: updatedTicket.description,
          due_date: updatedTicket.due_date,
          estimated_time: updatedTicket.estimated_time,
          spent_time: updatedTicket.spent_time
        }
      },
      notifyOnNetworkStatusChange: true,
      onCompleted: () => refresh()
    });
  };

  // const updateTheMembers = () => {
  //   updateUsersFromTicket({
  //     variables: {
  //       userId: membersIds,
  //       updateUsersFromTicketId: ticket.id
  //     }
  //   });
  // };

  const members: string[] = [];

  const updateMembersInternal = (member: string): void => {
    const updatedMembers = members?.includes(member) ? members.filter((m) => m !== member) : [...(members ?? []), member];

    setMembersIds(updatedMembers);
  };

  return (
    <JuraModal close={close} title="Mise à jour du ticket">
      <>
        <Card.Body>
          <Form>
            <FloatingLabel controlId="floatingInput" label="Titre" className="mb-10">
              <Form.Control
                className="my-2 border-primary"
                value={updatedTicket.title}
                placeholder="titre"
                name="title"
                onChange={(e) => {
                  setUpdateTicket({ ...updatedTicket, title: e.target.value });
                }}
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="Statut" className="mb-10">
              <Form.Select
                value={updatedTicket.status}
                className="my-2 border-primary"
                name="status"
                onChange={(e) => {
                  setUpdateTicket({ ...updatedTicket, status: e.target.value });
                }}
              >
                <option value="à faire">à faire</option>
                <option value="en cours">en cours</option>
                <option value="à valider">à valider</option>
                <option value="clos">clos</option>
                <option value="à archiver">à archiver</option>
              </Form.Select>
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="Priorité" className="mb-10">
              <Form.Select
                value={updatedTicket.priority}
                className="my-2 border-primary"
                name="priority"
                onChange={(e) => {
                  setUpdateTicket({ ...updatedTicket, priority: e.target.value });
                }}
              >
                <option value="HIGH">haute</option>
                <option value="MEDIUM">moyenne</option>
                <option value="LOW">basse</option>
              </Form.Select>
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="Description" className="mb-10">
              <Form.Control
                as="textarea"
                className="my-2 border-primary"
                value={updatedTicket.description}
                placeholder="description"
                name="description"
                onChange={(e) => {
                  setUpdateTicket({ ...updatedTicket, description: e.target.value });
                }}
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="Echéance" className="mb-10">
              <Form.Control
                type="date"
                className="my-2 border-primary"
                value={updatedTicket?.due_date}
                placeholder="date d'échéance"
                name="due_date"
                onChange={(e) => {
                  setUpdateTicket({ ...updatedTicket, due_date: e.target.value });
                }}
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="Temps estimé (h)" className="mb-10">
              <Form.Control
                type="number"
                className="my-2 border-primary"
                value={updatedTicket?.estimated_time}
                placeholder="temps estimé (h)"
                name="estimated_time"
                onChange={(e) => {
                  setUpdateTicket({ ...updatedTicket, estimated_time: +e.target.value });
                }}
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="Temps passé (h)" className="mb-10">
              <Form.Control
                type="number"
                className="my-2 border-primary"
                value={updatedTicket?.spent_time}
                placeholder="temps passé (h)"
                name="spent_time"
                onChange={(e) => {
                  setUpdateTicket({ ...updatedTicket, spent_time: +e.target.value });
                }}
              />
            </FloatingLabel>
            <MembersDropdown
              possibleMembers={
                projectItem?.members?.map((el) => toMemberFormSelectionElement({ ...toFormSelectionElementArg(el), values: membersIds })) ??
                []
              }
              selectMembers={(e) => updateMembersInternal(e)}
            />
          </Form>
          <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={popoverHoverFocus('envoyer')}>
            <Button className="mx-0" variant="outline-primary" size="sm" style={{ marginTop: '1rem' }} onClick={() => updateTheTicket()}>
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
