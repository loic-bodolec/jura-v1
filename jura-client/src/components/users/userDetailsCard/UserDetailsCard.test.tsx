import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ProjectStatus } from '../../../services/models/project';
import { UserDetailsCard } from './UserDetailsCard';

describe('UserDetailsCard', () => {
  it('should render the user detailed card', () => {
    const component = render(
      <MemoryRouter>
        <UserDetailsCard
          id="test"
          firstname="John"
          lastname="Doe"
          job_title="Developer"
          email="john@doe.com"
          projects={[
            {
              id: '1',
              name: 'Jura',
              status: ProjectStatus.OPEN
            },
            {
              id: '2',
              name: 'Netflix V2',
              status: ProjectStatus.CLOSED
            }
          ]}
        />
      </MemoryRouter>
    );

    expect(component.getByTestId('userDetailsCard-test')).toBeDefined();
    expect(component.getByTestId('userDetailsCard-test-name')).toBeDefined();
    expect(component.getByTestId('userDetailsCard-test-name')).toHaveTextContent('John Doe');
    expect(component.getByTestId('userDetailsCard-test-job')).toBeDefined();
    expect(component.getByTestId('userDetailsCard-test-job')).toHaveTextContent('Developer');
    expect(component.getByTestId('userDetailsCard-test-email')).toBeDefined();
    expect(component.getByTestId('userDetailsCard-test-email')).toHaveTextContent('john@doe.com');
    expect(component.getByTestId('userDetailsCard-test-projects-length')).toBeDefined();
    expect(component.getByTestId('userDetailsCard-test-projects-length')).toHaveTextContent('2');
    expect(component.getByTestId('userDetailsCard-test-projects-list')).toBeDefined();
    expect(component.getAllByTestId('userDetailsCard-test-projects-item')).toHaveLength(2);
    expect(component.getByTestId('userDetailsCard-test-projects-list')).toHaveTextContent('Jura (en cours)');
    expect(component.getByTestId('userDetailsCard-test-projects-list')).toHaveTextContent('Netflix V2 (clos)');
  });
});
