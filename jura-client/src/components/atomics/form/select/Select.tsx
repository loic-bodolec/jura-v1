import { FloatingLabel, Form } from 'react-bootstrap';

export interface FormSelectionElement {
  label: string;
  value: string;
  isSelected?: boolean;
}

export type SelectProps = {
  parentId: string;
  label: string;
  options: FormSelectionElement[];
  defaultOption?: string;
  selectOption: (value: string) => void;
};

export const Select = ({ parentId, label, options, defaultOption, selectOption }: SelectProps) => {
  const id = `${parentId}-select`;

  return (
    <FloatingLabel data-testid={`${id}-label`} controlId="floatingSelect" label={label}>
      <Form.Select data-testid={id} aria-label="Default select" className="mb-3" onChange={(e) => selectOption(e.currentTarget.value)}>
        {defaultOption && <option data-testid={`${id}-defaultOption`}>{defaultOption}</option>}
        {options.map((o) => (
          <option data-testid={`${id}-option-${o.value}`} key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </Form.Select>
    </FloatingLabel>
  );
};
