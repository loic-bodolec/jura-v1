import { render } from '@testing-library/react';
import { Title } from './Title';

describe('Title', () => {
  it('should render the text', () => {
    const component = render(<Title />);

    expect(component.queryByTestId('title-text')).not.toBeInTheDocument();
  });

  it('should render the text', () => {
    const component = render(<Title text="mes tickets" color="green" />);

    expect(component.getByTestId('title-text')).toHaveTextContent('mes tickets');
  });
});
