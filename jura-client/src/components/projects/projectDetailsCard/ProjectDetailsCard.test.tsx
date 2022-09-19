// TODO update ProjectDetailsCard.test.tsx

import { ApolloProvider } from '@apollo/client';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { initApolloClient } from '../../../services/api/ApolloClient/initApolloClient';
import { ProjectStatus } from '../../../services/models/project';
import { ProjectDetailsCard } from './ProjectDetailsCard';

const client = initApolloClient();

describe('ProjectDetailsCard', () => {
  it('should render the project detailed card', () => {
    const component = render(
      <ApolloProvider client={client}>
        <MemoryRouter>
          <ProjectDetailsCard
            id="test"
            name="big project"
            status={ProjectStatus.OPEN}
            description="lorem ipsum..."
            created_at={new Date('2022-04-01')}
            /* delivered_at={} */
            due_at={new Date('2022-12-03')}
            owner={{ id: '1', firstname: 'John', lastname: 'Doe' }}
            members={[
              { id: '2', firstname: 'Jane', lastname: 'Doe' },
              { id: '3', firstname: 'Justin', lastname: 'Doe' }
            ]}
          />
        </MemoryRouter>
      </ApolloProvider>
    );

    expect(component.getByTestId('ProjectDetailsCard-test')).toBeDefined();
    expect(component.getByTestId('ProjectDetailsCard-test-name')).toBeDefined();
    expect(component.getByTestId('ProjectDetailsCard-test-name')).toHaveTextContent('big project');
    expect(component.getByTestId('dateBadge')).toBeDefined();
    expect(component.getByTestId('ProjectDetailsCard-test-status')).toBeDefined();
    expect(component.getByTestId('ProjectDetailsCard-test-status')).toHaveTextContent('en cours');
    expect(component.getByTestId('ProjectDetailsCard-test-owner')).toBeDefined();
    expect(component.getByTestId('ProjectDetailsCard-test-owner')).toHaveTextContent('John Doe');
    expect(component.getByTestId('ProjectDetailsCard-test-description')).toBeDefined();
    expect(component.getByTestId('ProjectDetailsCard-test-description')).toHaveTextContent('lorem ipsum...');
    expect(component.getByTestId('ProjectDetailsCard-test-created-at')).toBeDefined();
    expect(component.getByTestId('ProjectDetailsCard-test-created-at')).toHaveTextContent('01/04/2022');
    expect(component.getByTestId('ProjectDetailsCard-test-members-list')).toBeDefined();
    expect(component.getAllByTestId('ProjectDetailsCard-test-members-item')).toHaveLength(2);
  });
});
