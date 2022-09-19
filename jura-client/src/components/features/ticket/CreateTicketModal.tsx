import { NetworkStatus, useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import { Card } from 'react-bootstrap';
import {
  toFormSelectionElementArg,
  toFormSelectionElementArg2,
  toMemberFormSelectionElement,
  toProjectFormSelectionElement
} from '../../../helper/mapper/toFormSelectionElement';
import { createNewEmptyTicket } from '../../../helper/ticket/createNewEmptyTicket';
import {
  CreateTicketInput,
  GetAllProjectsQuery,
  GetAllProjectsQueryVariables,
  GetAllUsersQuery,
  GetAllUsersQueryVariables,
  MutationCreateTicketArgs
} from '../../../services/api/generated/graphql';
import { GET_ALL_PROJECTS } from '../../../services/api/project/project-queries';
import { CREATE_TICKET } from '../../../services/api/ticket/ticket-mutations';
import { GET_ALL_TICKETS } from '../../../services/api/ticket/ticket-queries';
import { GET_ALL_USERS } from '../../../services/api/user/user-queries';
import { ErrorSection } from '../../atomics/error/ErrorSection';
import { Loader } from '../../atomics/loader/Loader';
import { JuraModal } from '../../atomics/modal/CustomModal';
import { CreateTicketForm } from './CreateTicketForm';

type CreateTicketModalProps = {
  close: () => void;
};

export const CreateTicketModal = ({ close }: CreateTicketModalProps) => {
  const [ticket, setTicket] = useState<CreateTicketInput>(createNewEmptyTicket());
  const [membersIds, setMembersIds] = useState<string[]>([]);
  const [projectId, setProjectId] = useState<string>('');

  const { loading, error, data, refetch, networkStatus } = useQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GET_ALL_USERS, {
    notifyOnNetworkStatusChange: true
  });

  const {
    loading: loadingProject,
    error: errorProject,
    data: dataProject,
    refetch: refetchProject,
    networkStatus: networkStatusProject
  } = useQuery<GetAllProjectsQuery, GetAllProjectsQueryVariables>(GET_ALL_PROJECTS, {
    notifyOnNetworkStatusChange: true
  });

  const [createTicket, state] = useMutation<CreateTicketInput, MutationCreateTicketArgs>(CREATE_TICKET, {
    refetchQueries: [GET_ALL_TICKETS],
    variables: { ticket, membersIds, projectId },
    notifyOnNetworkStatusChange: true,
    onCompleted: () => close()
  });

  return (
    <JuraModal close={close} title="Création d'un ticket">
      {state.loading || loading || networkStatus === NetworkStatus.refetch ? (
        <Loader message="Chargement..." />
      ) : state.error || error ? (
        <ErrorSection
          errorMessage={state?.error?.message ?? error?.message ?? ''}
          cancel={state?.error ? state.reset : close}
          retry={state?.error ? createTicket : refetch}
        />
      ) : (
        <>
          <Card.Body>
            <CreateTicketForm
              createTicket={createTicket}
              updateTicket={setTicket}
              ticket={ticket}
              possibleProjects={
                dataProject?.getAllProjects.map((el: any) =>
                  toProjectFormSelectionElement({ ...toFormSelectionElementArg2(el), value: projectId })
                ) ?? []
              }
              updateProject={setProjectId}
              possibleMembers={
                data?.getAllUsers.map((el) => toMemberFormSelectionElement({ ...toFormSelectionElementArg(el), values: membersIds })) ?? []
              }
              members={membersIds}
              updateMembers={setMembersIds}
            />
          </Card.Body>
        </>
      )}
    </JuraModal>
  );
};
