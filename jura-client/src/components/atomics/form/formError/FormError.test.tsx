import { ApolloError } from '@apollo/client';
import { render, screen } from '@testing-library/react';
import { FormError } from './FormError';

describe('FormError', () => {
  it('should show the error message', () => {
    render(<FormError error={new ApolloError({})} message="Something went wrong" />);

    expect(screen.getByTestId('error-message')).toHaveTextContent('Something went wrong');
  });

  it('should not show the error message', () => {
    render(<FormError message="Something went wrong" />);

    expect(screen.queryByTestId('error-message')).toBeNull();
  });
});
