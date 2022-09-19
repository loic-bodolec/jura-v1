import { FormDropdown } from '../../atomics/form/formDropdown/FormDropdown';
import { FormSelectionElement } from '../../atomics/form/select/Select';

export type MembersDropdownProps = {
  selectMembers: (value: string) => void;
  possibleMembers: FormSelectionElement[];
};

export const MembersDropdown = ({ selectMembers, possibleMembers }: MembersDropdownProps) => {
  return <FormDropdown parentId="members" label="Sélectionner des membres" items={possibleMembers} selectItem={selectMembers} />;
};
