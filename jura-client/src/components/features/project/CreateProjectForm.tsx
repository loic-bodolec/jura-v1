import { ApolloCache, DefaultContext, MutationFunctionOptions } from '@apollo/client';
import { FloatingLabel, Form } from 'react-bootstrap';
import { CreateProjectInput, MutationCreateProjectArgs } from '../../../services/api/generated/graphql';
import { JuraButton } from '../../atomics/button/JuraButton';
import { FormSelectionElement } from '../../atomics/form/select/Select';
import { TextArea } from '../../atomics/form/textarea/TextArea';
import { MembersDropdown } from './MembersDropdown';
import { OwnersDropdown } from './OwnersDropdown';

export type CreateProjectFormProps = {
  createProject: (
    options?: MutationFunctionOptions<CreateProjectInput, MutationCreateProjectArgs, DefaultContext, ApolloCache<any>> | undefined
  ) => Promise<any>;
  updateProject: (project: CreateProjectInput) => void;
  project: CreateProjectInput;
  possibleOwners: FormSelectionElement[];
  updateOwner: (id: string) => void;
  possibleMembers: FormSelectionElement[];
  members?: string[];
  updateMembers: (id: string[]) => void;
};

export const CreateProjectForm = ({
  createProject,
  updateProject,
  project,
  possibleOwners,
  updateOwner,
  possibleMembers,
  members,
  updateMembers
}: CreateProjectFormProps) => {
  const id = 'createProjectForm';

  const updateMembersInternal = (member: string): void => {
    const updatedMembers = members?.includes(member) ? members.filter((m) => m !== member) : [...(members ?? []), member];

    updateMembers(updatedMembers);
  };

  return (
    <Form data-testid={id}>
      {/* field should also be an atomic component */}
      <Form.Group className="mb-3 border-primary">
        <FloatingLabel data-testid={`${id}-label`} label="Nom du projet">
          <Form.Control
            data-testid={`${id}-name`}
            className="border-primary"
            type="text"
            onChange={(e) => updateProject({ ...project, name: e.target.value })}
            value={project.name}
          />
        </FloatingLabel>
        <FloatingLabel data-testid={`${id}-label`} label="Echéance" className="mb-10">
          <Form.Control
            data-testid={`${id}-date`}
            className="my-2 border-primary"
            type="date"
            name="Echéance"
            onChange={(e) => updateProject({ ...project, due_at: e.target.value })}
            value={project.due_at}
          />
        </FloatingLabel>
      </Form.Group>
      <OwnersDropdown possibleOwners={possibleOwners} selectOwner={(e) => updateOwner(e)} />
      <MembersDropdown possibleMembers={possibleMembers} selectMembers={(e) => updateMembersInternal(e)} />
      <TextArea label="Description" value={project.description} onChange={(e) => updateProject({ ...project, description: e })} />
      <JuraButton
        title="Créer"
        type="button"
        size="sm"
        parentId={`${id}-create`}
        variant="primary"
        disabled={!project.name}
        onClick={() => createProject()}
      />
    </Form>
  );
};
