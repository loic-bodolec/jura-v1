import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { UserCard } from './UserCard';

describe('UserCard', () => {
  it('should render the user card', () => {
    const component = render(
      <MemoryRouter>
        <UserCard id="test" firstname="John" lastname="Doe" job_title="Developer" email="john@doe.com" user_role={0} />
      </MemoryRouter>
    );

    expect(component.getByTestId('userCard-test')).toBeDefined();
    expect(component.getByTestId('userCard-test-name')).toBeDefined();
    expect(component.getByTestId('userCard-test-job')).toBeDefined();
    expect(component.getByTestId('userCard-test-email')).toBeDefined();
  });
});
