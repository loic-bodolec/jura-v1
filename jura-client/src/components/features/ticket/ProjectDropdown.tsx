import { FormDropdown } from '../../atomics/form/formDropdown/FormDropdown';
import { FormSelectionElement } from '../../atomics/form/select/Select';

export type ProjectsDropdownProps = {
  selectProject: (value: string) => void;
  possibleProjects: FormSelectionElement[];
};

export const ProjectsDropdown = ({ selectProject, possibleProjects }: ProjectsDropdownProps) => {
  return <FormDropdown parentId="projects" label="Sélectionner un projet" items={possibleProjects} selectItem={selectProject} />;
};
