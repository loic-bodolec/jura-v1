import { FormDropdown } from '../../atomics/form/formDropdown/FormDropdown';
import { FormSelectionElement } from '../../atomics/form/select/Select';

export type OwnersDropdownProps = {
  selectOwner: (value: string) => void;
  possibleOwners: FormSelectionElement[];
};

export const OwnersDropdown = ({ selectOwner, possibleOwners }: OwnersDropdownProps) => {
  return <FormDropdown parentId="owners" label="Sélectionner un responsable" items={possibleOwners} selectItem={selectOwner} />;
};
