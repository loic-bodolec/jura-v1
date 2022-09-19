import { fireEvent, render } from '@testing-library/react';
import { TextArea } from './TextArea';

describe('TextArea', () => {
  it('should show the initial value', async () => {
    const update = jest.fn();
    const component = render(<TextArea label="test" onChange={update} value="some test value" />);

    expect(component.getByTestId('textarea-control')).toHaveTextContent('some test value');
  });

  it('should update the content', async () => {
    const update = jest.fn();
    const component = render(<TextArea label="test" onChange={update} />);
    const textarea = component.getByTestId('textarea-control');

    fireEvent.change(textarea, { target: { value: 'some test value' } });

    expect(update).toHaveBeenCalledWith('some test value');
  });
});
