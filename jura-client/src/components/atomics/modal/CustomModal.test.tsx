import { fireEvent, render } from '@testing-library/react';
import { JuraModal } from './CustomModal';

describe('CustomModal', () => {
  it('should render the content', () => {
    const close = jest.fn();
    const component = render(
      <JuraModal close={close} title="test title">
        <div>Some nice content</div>
      </JuraModal>
    );

    expect(component.getByTestId('modal')).toBeDefined();
    expect(component.getByTestId('modal-header')).toBeDefined();
    expect(component.getByTestId('modal-title')).toBeDefined();
    expect(component.getByTestId('modal-title')).toHaveTextContent('test title');
    expect(component.getByTestId('modal-content')).toHaveTextContent('Some nice content');
  });

  it('should close the modal', () => {
    const close = jest.fn();
    const component = render(
      <JuraModal close={close} title="test title">
        <div>Some nice content</div>
      </JuraModal>
    );

    fireEvent.click(component.getByLabelText('Close'));

    expect(close).toHaveBeenCalled();
  });
});
