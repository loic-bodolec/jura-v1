import { render } from '@testing-library/react';
import { Members } from './Members';

describe('Participants', () => {
  it('should render 4 participants max', () => {
    const component = render(
      <Members
        members={[
          'https://randomuser.me/api/portraits/thumb/men/12.jpg',
          'https://randomuser.me/api/portraits/thumb/women/75.jpg',
          'https://randomuser.me/api/portraits/thumb/women/35.jpg',
          'https://randomuser.me/api/portraits/thumb/men/17.jpg',
          'https://randomuser.me/api/portraits/thumb/men/65.jpg',
          'https://randomuser.me/api/portraits/thumb/women/45.jpg'
        ]}
      />
    );

    expect(component.getAllByTestId('participant')).toHaveLength(4);
  });

  it('should render all participants', () => {
    const component = render(
      <Members
        members={[
          'https://randomuser.me/api/portraits/thumb/men/12.jpg',
          'https://randomuser.me/api/portraits/thumb/women/75.jpg',
          'https://randomuser.me/api/portraits/thumb/women/35.jpg',
          'https://randomuser.me/api/portraits/thumb/men/17.jpg'
        ]}
      />
    );

    expect(component.getAllByTestId('participant')).toHaveLength(4);
  });

  it('should not render participants', () => {
    const component = render(<Members />);

    expect(component.queryByTestId('participants')).toBeNull();
  });
});
