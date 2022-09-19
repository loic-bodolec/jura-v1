import { ApolloProvider } from '@apollo/client';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { initApolloClient } from '../../../services/api/ApolloClient/initApolloClient';
import { TicketPriority } from '../../../services/models/ticket';
import { TicketDetailsCard } from './TicketDetailsCard';

const client = initApolloClient();

const ticket = {
  id: 'test',
  status: 'en cours',
  priority: TicketPriority.HIGH,
  description: 'lorem ipsum...',
  title: 'big bug',
  due_date: new Date(),
  estimated_time: 6,
  spent_time: 4,
  created_at: new Date(),
  project: {
    id: 1,
    name: 'Jura'
  },
  created_by: {
    id: 1,
    firstname: 'John',
    lastname: 'Doe'
  },
  users: [
    {
      id: '1',
      firstname: 'John',
      lastname: 'Doe'
    },
    {
      id: '2',
      firstname: 'Jane',
      lastname: 'Doe'
    }
  ]
};

describe('TicketDetailsCard', () => {
  it('should render the ticket detailed card', () => {
    const component = render(
      <ApolloProvider client={client}>
        <MemoryRouter>
          <TicketDetailsCard ticketInfo={ticket as any} />
        </MemoryRouter>
      </ApolloProvider>
    );

    expect(component.getByTestId('ticketDetailsCard-test')).toBeDefined();
    expect(component.getByTestId('ticketDetailsCard-test-priority-icon')).toBeDefined();
    expect(component.getByTestId('ticketDetailsCard-test-title')).toBeDefined();
    expect(component.getByTestId('ticketDetailsCard-test-title')).toHaveTextContent('big bug');
    expect(component.getByTestId('dateBadge')).toBeDefined();
    expect(component.getByTestId('ticketDetailsCard-test-project-name')).toBeDefined();
    expect(component.getByTestId('ticketDetailsCard-test-project-name')).toHaveTextContent('Jura');
    expect(component.getByTestId('ticketDetailsCard-test-status')).toBeDefined();
    expect(component.getByTestId('ticketDetailsCard-test-status')).toHaveTextContent('en cours');
    expect(component.getByTestId('ticketDetailsCard-test-priority')).toBeDefined();
    expect(component.getByTestId('ticketDetailsCard-test-priority')).toHaveTextContent('haute');
    expect(component.getByTestId('ticketDetailsCard-test-description')).toBeDefined();
    expect(component.getByTestId('ticketDetailsCard-test-description')).toHaveTextContent('lorem ipsum...');
    expect(component.getByTestId('ticketDetailsCard-test-created-date')).toBeDefined();
    expect(component.getByTestId('ticketDetailsCard-test-created-by')).toBeDefined();
    expect(component.getByTestId('ticketDetailsCard-test-created-by')).toHaveTextContent('John Doe');
    expect(component.getByTestId('ticketDetailsCard-test-estimated-time')).toBeDefined();
    expect(component.getByTestId('ticketDetailsCard-test-estimated-time')).toHaveTextContent('6');
    expect(component.getByTestId('ticketDetailsCard-test-spent-time')).toBeDefined();
    expect(component.getByTestId('ticketDetailsCard-test-spent-time')).toHaveTextContent('4');
    expect(component.getByTestId('ticketDetailsCard-test-users')).toBeDefined();
    expect(component.getByTestId('ticketDetailsCard-test-members-list')).toBeDefined();
    expect(component.getAllByTestId('ticketDetailsCard-test-members-item')).toHaveLength(2);
    expect(component.getByTestId('ticketDetailsCard-test-footer')).toBeDefined();
    // expect(component.getByTestId('ticketDetailsCard-test-update-button')).toBeDefined();
  });
});
