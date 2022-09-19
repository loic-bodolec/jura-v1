import { fireEvent, render, waitFor } from '@testing-library/react';
import { Action, ProjectAction } from '../../../services/models/action';
import { Ellipsis } from './Ellipsis';

describe('Ellipsis', () => {
  it('should open the menu', async () => {
    const onAction = jest.fn();
    const actions: Action[] = [{ type: ProjectAction.CLOSE, title: 'Supprimer' }];

    const component = render(<Ellipsis actions={actions} element={{ id: '1' }} onAction={onAction} />);

    expect(component.getByTestId('ellipsis')).toBeDefined();
    expect(component.queryByTestId('ellipsis-menu')).not.toBeInTheDocument();

    // open
    fireEvent.click(component.getByTestId('ellipsis-toggle'));
    await waitFor(() => {
      expect(component.getByTestId('ellipsis-menu')).toBeInTheDocument();
      expect(component.getAllByTestId(/ellipsis-menu-item-[^]/)).toHaveLength(1);
    });
  });

  it('should call the event', async () => {
    const onAction = jest.fn();
    const actions: Action[] = [{ type: ProjectAction.CLOSE, title: 'Fermer' }];

    const component = render(<Ellipsis actions={actions} element={{ id: '1' }} onAction={onAction} />);

    fireEvent.click(component.getByTestId('ellipsis-toggle'));
    fireEvent.click(component.getByTestId('ellipsis-menu-item-CLOSE'));
    await waitFor(() => {
      expect(onAction).toHaveBeenCalledWith(actions[0], { id: '1' });
    });
  });
});
