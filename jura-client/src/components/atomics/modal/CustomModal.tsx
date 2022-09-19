import { ReactElement } from 'react';
import { Modal } from 'react-bootstrap';

export type JuraModalProps = {
  close: () => void;
  title?: string;
  children: ReactElement<any, any>;
};

export const JuraModal = ({ title, close, children }: JuraModalProps) => {
  const id = 'modal';

  return (
    <Modal data-testid={id} show onHide={close} backdrop="static" keyboard={false}>
      <Modal.Header data-testid={`${id}-header`} closeButton>
        <Modal.Title data-testid={`${id}-title`}>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body data-testid={`${id}-content`}>{children}</Modal.Body>
    </Modal>
  );
};
