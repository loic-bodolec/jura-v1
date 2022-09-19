// TODO update TicketsSwimlane.test.tsx

import { ApolloProvider } from '@apollo/client';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { initApolloClient } from '../../../services/api/ApolloClient/initApolloClient';
import { Ticket } from '../../../services/api/generated/graphql';
import { TicketPriority } from '../../../services/models/ticket';
import { TicketsSwimlane } from './TicketsSwimlane';

const client = initApolloClient();

const tickets = [
  {
    id: '1',
    status: 'à faire',
    priority: TicketPriority.HIGH,
    title: 'big bug',
    due_date: new Date(),
    estimated_time: 6,
    created_at: new Date(),
    created_by: { id: '1' },
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
  },
  {
    id: '2',
    status: 'à faire',
    priority: TicketPriority.LOW,
    title: 'small bug',
    due_date: new Date(),
    estimated_time: 6,
    created_at: new Date(),
    created_by: { id: '2' },
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
  }
];

describe('TicketsSwimlane', () => {
  it('should render the content', () => {
    const component = render(
      <ApolloProvider client={client}>
        <MemoryRouter>
          <TicketsSwimlane tickets={tickets as Array<Ticket>} title="test" />
        </MemoryRouter>
      </ApolloProvider>
    );

    expect(component.getByTestId('swimlane')).toBeDefined();
    expect(component.getByTestId('swimlane-header')).toBeDefined();
    expect(component.getByTestId('swimlane-tickets-list')).toBeDefined();
  });
});
