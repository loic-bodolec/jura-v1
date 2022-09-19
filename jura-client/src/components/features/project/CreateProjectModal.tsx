import { NetworkStatus, useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import { Card } from 'react-bootstrap';
import {
  toFormSelectionElementArg,
  toMemberFormSelectionElement,
  toOwnerFormSelectionElement
} from '../../../helper/mapper/toFormSelectionElement';
import { createNewEmptyProject } from '../../../helper/project/createNewEmptyProject';
import { CreateProjectInput, GetAllUsersQuery, MutationCreateProjectArgs } from '../../../services/api/generated/graphql';
import { CREATE_PROJECT } from '../../../services/api/project/project-mutations';
import { GET_ALL_PROJECTS } from '../../../services/api/project/project-queries';
import { GET_ALL_USERS } from '../../../services/api/user/user-queries';
import { ErrorSection } from '../../atomics/error/ErrorSection';
import { Loader } from '../../atomics/loader/Loader';
import { JuraModal } from '../../atomics/modal/CustomModal';
import { CreateProjectForm } from './CreateProjectForm';

type CreateProjectModalProps = {
  close: () => void;
};

export const CreateProjectModal = ({ close }: CreateProjectModalProps) => {
  const [project, setProject] = useState<CreateProjectInput>(createNewEmptyProject());
  const [membersIds, setMembersIds] = useState<string[]>([]);
  const [ownerId, setOwnerId] = useState<string>('');

  const { loading, error, data, refetch, networkStatus } = useQuery<GetAllUsersQuery>(GET_ALL_USERS, {
    notifyOnNetworkStatusChange: true
  });

  const [createProject, state] = useMutation<CreateProjectInput, MutationCreateProjectArgs>(CREATE_PROJECT, {
    refetchQueries: [GET_ALL_PROJECTS],
    variables: { projectInput: project, membersIds, ownerId },
    notifyOnNetworkStatusChange: true,
    onCompleted: () => close()
  });

  return (
    <JuraModal close={close} title="Création d'un projet">
      {state.loading || loading || networkStatus === NetworkStatus.refetch ? (
        <Loader message="Chargement..." />
      ) : state.error || error ? (
        <ErrorSection
          errorMessage={state?.error?.message ?? error?.message ?? ''}
          cancel={state?.error ? state.reset : close}
          retry={state?.error ? createProject : refetch}
        />
      ) : (
        <>
          <Card.Body>
            <CreateProjectForm
              createProject={createProject}
              updateProject={setProject}
              project={project}
              possibleOwners={
                data?.getAllUsers.map((el) => toOwnerFormSelectionElement({ ...toFormSelectionElementArg(el), value: ownerId })) ?? []
              }
              updateOwner={setOwnerId}
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
