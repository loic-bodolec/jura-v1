import { render } from '@testing-library/react';
import { DateBadge } from './DateBadge';

describe('DateBadge', () => {
  it('should be green', () => {
    const date = new Date();
    date.setDate(date.getDate() + 10);
    const component = render(<DateBadge dueDate={date} />);

    expect(component.getByTestId('dateBadge')).toHaveClass('bg-success');
  });

  it('should be orange', () => {
    const date = new Date();
    date.setDate(date.getDate() + 5);
    const component = render(<DateBadge dueDate={date} />);

    expect(component.getByTestId('dateBadge')).toHaveClass('bg-warning');
  });

  it('should be red when due date is in the past', () => {
    const date = new Date();
    date.setDate(date.getDate() - 6);
    const component = render(<DateBadge dueDate={date} />);

    expect(component.getByTestId('dateBadge')).toHaveClass('bg-danger');
  });

  it('should be red', () => {
    const date = new Date();
    date.setDate(date.getDate() + 2);
    const component = render(<DateBadge dueDate={date} />);

    expect(component.getByTestId('dateBadge')).toHaveClass('bg-danger');
  });
});
