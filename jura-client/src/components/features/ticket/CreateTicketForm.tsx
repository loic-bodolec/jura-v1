import { ApolloCache, DefaultContext, MutationFunctionOptions } from '@apollo/client';
import { FloatingLabel, Form } from 'react-bootstrap';
import { CreateTicketInput, MutationCreateTicketArgs } from '../../../services/api/generated/graphql';
import { JuraButton } from '../../atomics/button/JuraButton';
import { FormSelectionElement } from '../../atomics/form/select/Select';
import { TextArea } from '../../atomics/form/textarea/TextArea';
import { MembersDropdown } from '../project/MembersDropdown';
import { ProjectsDropdown } from './ProjectDropdown';

export type CreateTicketFormProps = {
  createTicket: (
    options?: MutationFunctionOptions<CreateTicketInput, MutationCreateTicketArgs, DefaultContext, ApolloCache<any>> | undefined
  ) => Promise<any>;
  updateTicket: (ticket: CreateTicketInput) => void;
  ticket: CreateTicketInput;
  possibleProjects: FormSelectionElement[];
  updateProject: (id: string) => void;
  possibleMembers: FormSelectionElement[];
  members?: string[];
  updateMembers: (id: string[]) => void;
};

export const CreateTicketForm = ({
  createTicket,
  updateTicket,
  ticket,
  possibleProjects,
  updateProject,
  possibleMembers,
  members,
  updateMembers
}: CreateTicketFormProps) => {
  const id = 'createTicketForm';

  const updateMembersInternal = (member: string): void => {
    const updatedMembers = members?.includes(member) ? members.filter((m) => m !== member) : [...(members ?? []), member];

    updateMembers(updatedMembers);
  };

  return (
    <Form data-testid={id}>
      {/* field should also be an atomic component */}
      <Form.Group className="mb-3 border-primary">
        <FloatingLabel data-testid={`${id}-label`} controlId="floatingInput" label="Titre du ticket" className="mb-10">
          <Form.Control
            data-testid={`${id}-title`}
            className="border-primary"
            type="text"
            onChange={(e) => updateTicket({ ...ticket, title: e.target.value })}
            value={ticket.title}
          />
        </FloatingLabel>
        <FloatingLabel data-testid={`${id}-label`} controlId="floatingInput" label="Priorité" className="mb-10">
          <Form.Select
            data-testid={`${id}-priority`}
            className="my-2 border-primary"
            name="priority"
            onChange={(e) => updateTicket({ ...ticket, priority: e.target.value })}
            value={ticket.priority}
          >
            <option value="HIGH">haute</option>
            <option value="MEDIUM">moyenne</option>
            <option value="LOW">basse</option>
          </Form.Select>
        </FloatingLabel>
        <FloatingLabel data-testid={`${id}-label`} controlId="floatingInput" label="Temps estimé" className="mb-10">
          <Form.Control
            data-testid={`${id}-estimated-time`}
            className="my-2 border-primary"
            type="number"
            name="Temps estimé"
            onChange={(e) => updateTicket({ ...ticket, estimated_time: +e.target.value })}
            value={ticket.estimated_time}
          />
        </FloatingLabel>
        <FloatingLabel data-testid={`${id}-label`} controlId="floatingInput" label="Echéance" className="mb-10">
          <Form.Control
            data-testid={`${id}-date`}
            className="my-2 border-primary"
            type="date"
            name="Echéance"
            onChange={(e) => updateTicket({ ...ticket, due_date: e.target.value })}
            value={ticket.due_date}
          />
        </FloatingLabel>
      </Form.Group>
      <ProjectsDropdown possibleProjects={possibleProjects} selectProject={(e) => updateProject(e)} />
      <MembersDropdown possibleMembers={possibleMembers} selectMembers={(e) => updateMembersInternal(e)} />
      <TextArea
        data-testid={`${id}-description`}
        label="Description"
        value={ticket.description}
        onChange={(e) => updateTicket({ ...ticket, description: e })}
      />
      <JuraButton
        title="Créer"
        type="button"
        size="sm"
        parentId={`${id}-create`}
        variant="primary"
        disabled={!ticket.title}
        onClick={() => createTicket()}
      />
    </Form>
  );
};
