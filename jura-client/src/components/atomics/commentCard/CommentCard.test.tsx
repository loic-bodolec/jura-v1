// TODO update CommentsCard.test.tsx
import { ApolloProvider } from '@apollo/client';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { initApolloClient } from '../../../services/api/ApolloClient/initApolloClient';
import { Comment } from '../../../services/api/generated/graphql';
import { CommentCard } from './CommentCard';

const client = initApolloClient();

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

const comment: Partial<Comment> = {
  id: 'test',
  text: 'lorem ipsum',
  created_date: today,
  updated_date: tomorrow,
  user: {
    id: '1',
    firstname: 'John',
    lastname: 'Doe',
    averageTimePerTicket: 0,
    email: '',
    job_title: '',
    password: '',
    projects: [],
    role: 0,
    tickets: []
  }
};

describe('CommentCard', () => {
  it('should render the comment card', () => {
    const component = render(
      <ApolloProvider client={client}>
        <MemoryRouter>
          <CommentCard comment={comment} />
        </MemoryRouter>
      </ApolloProvider>
    );

    expect(component.getByTestId('commentCard-test')).toBeDefined();
    expect(component.getByTestId('commentCard-test-user')).toBeDefined();
    // expect(component.getByTestId('commentCard-test-link')).toBeDefined();
    expect(component.getByTestId('commentCard-test-user')).toHaveTextContent('John Doe');
    expect(component.getByTestId('commentCard-test-created-date')).toBeDefined();
    expect(component.getByTestId('commentCard-test-created-date')).toHaveTextContent(today.toLocaleString('fr-FR'));
    expect(component.getByTestId('commentCard-test-text')).toBeDefined();
    expect(component.getByTestId('commentCard-test-text')).toHaveTextContent('lorem ipsum');
    // expect(component.getByTestId('commentCard-test-delete-button')).toBeDefined();
    // expect(component.getByTestId('commentCard-test-update-button')).toBeDefined();
  });
});
