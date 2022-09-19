// TODO update SideBar.test.tsx
import { ApolloProvider } from '@apollo/client';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { initApolloClient } from '../../services/api/ApolloClient/initApolloClient';
import SideBar from './SideBar';

const client = initApolloClient();

describe('SideBar', () => {
  it('should render the sidebar', () => {
    const isActive = true;
    const component = render(
      <ApolloProvider client={client}>
        <MemoryRouter>
          <SideBar isActive={isActive} />
        </MemoryRouter>
      </ApolloProvider>
    );

    expect(component.getByTestId('project-list-button')).toBeDefined();
    expect(component.getByTestId('nav-items')).toBeDefined();
    expect(component.getByTestId('dashboard-link')).toBeDefined();
    expect(component.getByTestId('members-list-link')).toBeDefined();
    expect(component.getByTestId('my-projects-link')).toBeDefined();
    expect(component.getByTestId('my-tickets-link')).toBeDefined();
    expect(component.getByTestId('archives-link')).toBeDefined();
    expect(component.getByTestId('create-button')).toBeDefined();
  });
});
