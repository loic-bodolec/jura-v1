import { render } from '@testing-library/react';
import { Loader } from './Loader';

describe('Loader', () => {
  it('should render the spinner', () => {
    const component = render(<Loader />);

    expect(component.getByTestId('loader-spinner')).toBeInTheDocument();
  });

  it('should render the message', () => {
    const component = render(<Loader />);

    expect(component.queryByTestId('loader-message')).not.toBeInTheDocument();
  });

  it('should render the message', () => {
    const component = render(<Loader message="loading the projects" />);

    expect(component.getByTestId('loader-message')).toHaveTextContent('loading the projects');
  });
});
