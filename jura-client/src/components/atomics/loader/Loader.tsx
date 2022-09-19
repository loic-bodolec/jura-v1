import Spinner from 'react-bootstrap/Spinner';

type LoaderProps = {
  message?: string;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
};

export const Loader = ({ message, variant }: LoaderProps) => {
  const id = 'loader';

  return (
    <div data-testid={id} className="d-flex flex-column justify-content-center align-items-center m-5">
      <Spinner data-testid={`${id}-spinner`} animation="border" role="status" variant={`${variant}`}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      {message && <p data-testid={`${id}-message`}>{message}</p>}
    </div>
  );
};
