import { Button } from 'react-bootstrap';
import { AiOutlineMeh } from 'react-icons/ai';
import { Icon } from '../icon/Icon';

interface ErrorSectionProps {
  errorMessage: string;
  cancel: () => void;
  retry: () => void;
}

export const ErrorSection = ({ errorMessage, cancel, retry }: ErrorSectionProps) => {
  const id = 'errorSection';

  return (
    <div data-testid={id} className="jumbotron d-flex flex-column justify-content-center text-center">
      <h4 className="mb-3">Une erreur s'est produite</h4>
      <Icon id={id} icon={<AiOutlineMeh size={50} />} />
      <p data-testid={`${id}-message`} className="lead mt-3">
        {errorMessage}
      </p>
      <div className="d-flex justify-content-around">
        <Button data-testid={`${id}-retry`} variant="primary" onClick={() => retry()}>
          Recommencer
        </Button>
        <Button data-testid={`${id}-cancel`} variant="outline-success" onClick={() => cancel()}>
          Annuler
        </Button>
      </div>
    </div>
  );
};
