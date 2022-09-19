import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Link } from './Link';

describe('Link', () => {
  it('should show a link', () => {
    render(<Link title="test" to="/test" />, { wrapper: MemoryRouter });

    expect(screen.getByTestId('/test')).toBeDefined();
  });
});
