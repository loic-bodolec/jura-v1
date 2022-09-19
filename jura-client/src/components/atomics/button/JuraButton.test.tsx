import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { Icon } from '../icon/Icon';
import { JuraButton } from './JuraButton';

describe('JuraButton', () => {
  it('should render the title', () => {
    const component = render(
      <JuraButton
        title="Nouveau projet"
        type="button"
        icon={<Icon id="Createproject" icon={<AiOutlinePlusCircle size={30} style={{ marginRight: '10px' }} />} />}
        onClick={jest.fn()}
        variant="primary"
        size="lg"
        parentId="test"
      />
    );
    expect(component.getByTestId('test-button')).toHaveTextContent('Nouveau projet');
  });

  it('should render the icon', () => {
    const component = render(
      <JuraButton
        title="Nouveau projet"
        type="button"
        icon={<Icon id="Createproject" icon={<AiOutlinePlusCircle size={30} style={{ marginRight: '10px' }} />} />}
        onClick={jest.fn()}
        variant="primary"
        size="lg"
        parentId="test"
      />
    );
    expect(component.getByTestId('icon-Createproject')).toBeDefined();
  });

  it('should not render the icon', () => {
    const component = render(
      <JuraButton title="Nouveau projet" type="button" onClick={jest.fn()} variant="primary" size="lg" parentId="test" />
    );
    expect(component.queryByTestId('icon-Createproject')).toBeNull();
  });

  it('should call onclick', async () => {
    const onClick = jest.fn();
    const component = render(
      <JuraButton title="Nouveau projet" type="button" onClick={onClick} variant="primary" size="lg" parentId="test" />
    );

    fireEvent.click(component.getByTestId('test-button'));
    await waitFor(() => expect(onClick).toHaveBeenCalled());
  });

  it('should be disabled', async () => {
    const onClick = jest.fn();
    render(<JuraButton title="Nouveau projet" type="button" onClick={onClick} variant="primary" size="lg" parentId="test" disabled />);

    expect(screen.getByTestId('test-button')).toBeDisabled();
  });
});
