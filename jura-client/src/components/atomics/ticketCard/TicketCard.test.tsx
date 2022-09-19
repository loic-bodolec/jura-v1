import { ApolloProvider } from '@apollo/client';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { initApolloClient } from '../../../services/api/ApolloClient/initApolloClient';
import { TicketPriority } from '../../../services/models/ticket';
import { TicketCard } from './TicketCard';

const client = initApolloClient();

describe('ticketCard', () => {
  it('should render the ticket card', () => {
    const component = render(
      <ApolloProvider client={client}>
        <MemoryRouter>
          <TicketCard
            id="test"
            status="à faire"
            priority={TicketPriority.HIGH}
            description="lorem ipsum..."
            title="big bug"
            due_date={new Date()}
            estimated_time={6}
            created_by={{ id: '1' }}
            users={[
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
            ]}
          />
        </MemoryRouter>
      </ApolloProvider>
    );

    expect(component.getByTestId('ticketCard-test')).toBeDefined();
    expect(component.getByTestId('ticketCard-test-title-status')).toBeDefined();
    expect(component.getByTestId('ticketCard-test-title')).toHaveTextContent('big bug');
    expect(component.getByTestId('ticketCard-test-priority')).toBeDefined();
    expect(component.getByTestId('ticketCard-test-priority')).toHaveTextContent('haute');
    expect(component.getByTestId('ticketCard-test-due-date')).toBeDefined();
    expect(component.getByTestId('ticketCard-test-id')).toBeDefined();
    expect(component.getByTestId('ticketCard-test-id')).toHaveTextContent('test');
    expect(component.getByTestId('ticketCard-test-estimated-time')).toBeDefined();
    expect(component.getByTestId('ticketCard-test-estimated-time')).toHaveTextContent('6');
    expect(component.getByTestId('ticketCard-test-users')).toBeDefined();
    expect(component.getAllByTestId('ticketCard-test-item')).toHaveLength(2);
    expect(component.getByTestId('ticketCard-test-footer')).toBeDefined();
    // expect(component.getByTestId('ticketCard-test-delete-button')).toBeDefined();
  });
});
