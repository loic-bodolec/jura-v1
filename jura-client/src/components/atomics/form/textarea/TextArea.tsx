import { FloatingLabel, Form } from 'react-bootstrap';

export type TextAreaProps = {
  label: string;
  value?: string | null;
  placeholder?: string;
  onChange: (value: string) => void;
};

export const TextArea = ({ label, placeholder, value, onChange }: TextAreaProps) => {
  return (
    <FloatingLabel data-testid="textarea" controlId="floatingTextarea" label={label}>
      <Form.Control
        data-testid="textarea-control"
        as="textarea"
        className="border-primary my-2"
        placeholder={placeholder}
        style={{ height: '150px' }}
        onChange={(e) => onChange(e.target.value)}
        value={value!}
      />
    </FloatingLabel>
  );
};
