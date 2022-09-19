import { Dropdown } from 'react-bootstrap';
import { FormSelectionElement } from '../select/Select';

export type FormDropdownProps = {
  parentId: string;
  label: string;
  items: FormSelectionElement[];
  selectItem: (value: string) => void;
};

export const FormDropdown = ({ parentId, label, items, selectItem }: FormDropdownProps) => {
  const id = `${parentId}-formDropdown`;

  return (
    <Dropdown data-testid={id} className="mb-3">
      <Dropdown.Toggle data-testid={`${id}-toggle`} variant="transparent btn-outline-primary" id="dropdown-basic">
        {label}
      </Dropdown.Toggle>
      <Dropdown.Menu data-testid={`${id}-menu`}>
        {items.map((item: FormSelectionElement) => {
          const itemId = `${id}-menu-item-${item.value}`;
          return (
            <Dropdown.Item key={itemId} data-testid={itemId} active={item.isSelected} onClick={(e) => selectItem(item.value)}>
              {item.label}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
};
