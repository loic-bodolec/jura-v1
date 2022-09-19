import { FormSelectionElement } from '../../components/atomics/form/select/Select';

interface FormSelectionElementArgs {
  id: string;
  firstname: string;
  lastname: string;
  value?: string;
  values?: string[];
}

interface FormSelectionElementArgs2 {
  id: string;
  name: string;
  value?: string;
  values?: string[];
}

export const toFormSelectionElementArg = (element: { id: string; firstname: string; lastname: string }): FormSelectionElementArgs => {
  return {
    id: element.id,
    firstname: element.firstname,
    lastname: element.lastname
  };
};

export const toFormSelectionElementArg2 = (element: { id: string; name: string; lastname: string }): FormSelectionElementArgs2 => {
  return {
    id: element.id,
    name: element.name
  };
};

export const toOwnerFormSelectionElement = ({ firstname, lastname, id, value }: FormSelectionElementArgs): FormSelectionElement => {
  return {
    label: `${firstname} ${lastname}`,
    isSelected: value === id,
    value: id
  };
};

export const toMemberFormSelectionElement = ({ firstname, lastname, id, values }: FormSelectionElementArgs): FormSelectionElement => {
  return {
    label: `${firstname} ${lastname}`,
    isSelected: values?.includes(id),
    value: id
  };
};

export const toProjectFormSelectionElement = ({ name, id, value }: FormSelectionElementArgs2): FormSelectionElement => {
  return {
    label: name,
    isSelected: value === id,
    value: id
  };
};
