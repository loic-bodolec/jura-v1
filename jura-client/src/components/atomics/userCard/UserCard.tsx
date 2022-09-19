import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from '../link/Link';

export type UserCardProps = {
  id: string;
  firstname: string;
  lastname: string;
  job_title: string;
  email: string;
  user_role: number;
};

export const UserCard = ({ id, firstname, lastname, job_title, email, user_role }: UserCardProps) => {
  const cardId = `userCard-${id}`;

  return (
    <Card data-testid={cardId} style={{ width: '18rem' }} className="rounded shadow border-0 my-2 mx-2">
      <Card.Body>
        <Card.Title data-testid={`${cardId}-name`}>
          <Link to={`/users/${id}`} title={`${firstname} ${lastname} ${user_role === 0 ? '(admin)' : ''}`} />
        </Card.Title>
        <Card.Subtitle data-testid={`${cardId}-job`} className="mb-2">
          {job_title}
        </Card.Subtitle>
        <Card.Subtitle data-testid={`${cardId}-email`} className="mb-2">
          {email}
        </Card.Subtitle>
      </Card.Body>
    </Card>
  );
};
