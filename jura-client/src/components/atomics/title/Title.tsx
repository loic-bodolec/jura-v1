import { Card } from 'react-bootstrap';

type TitleProps = {
  text?: string;
  align?: 'left' | 'center' | 'right';
  color?: string;
  backgroundColor?: string;
};

export const Title = ({ text, align, color, backgroundColor }: TitleProps) => {
  const id = 'title';

  return (
    <div className={`d-flex justify-content-${align}`}>
      <Card.Header
        data-testid={id}
        className="rounded shadow border-0"
        style={{
          margin: '2rem',
          textAlign: 'center',
          fontSize: '1rem',
          fontWeight: 'bold',
          color: `${color}`,
          backgroundColor: `${backgroundColor}`
        }}
      >
        {text && (
          <p style={{ margin: '0rem' }} data-testid={`${id}-text`}>
            {text}
          </p>
        )}
      </Card.Header>
    </div>
  );
};
