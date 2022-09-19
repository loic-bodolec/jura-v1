import { fireEvent, render, waitFor } from '@testing-library/react';
import { ErrorSection } from './ErrorSection';

describe('Error section', () => {
  it('should render the error message', () => {
    const component = render(<ErrorSection errorMessage="some error" cancel={jest.fn()} retry={jest.fn()} />);

    expect(component.getByTestId('errorSection-message')).toHaveTextContent('some error');
  });

  it('should call retry', async () => {
    const cancel = jest.fn();
    const component = render(<ErrorSection errorMessage="some error" cancel={cancel} retry={jest.fn()} />);
    fireEvent.click(component.getByTestId('errorSection-cancel'));

    await waitFor(() => expect(cancel).toHaveBeenCalled());
  });

  it('should call cancel', () => {
    const retry = jest.fn();
    const component = render(<ErrorSection errorMessage="some error" cancel={jest.fn()} retry={retry} />);
    fireEvent.click(component.getByTestId('errorSection-retry'));

    expect(retry).toHaveBeenCalled();
  });
});
