import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface LinkProp {
  to: string;
  title: string;
}

export const Link = ({ to, title }: LinkProp) => {
  return (
    <RouterLink data-testid={to} to={to} style={{ textDecoration: 'none' }}>
      {title}
    </RouterLink>
  );
};
