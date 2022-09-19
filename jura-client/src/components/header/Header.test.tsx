// TODO update Header.test.tsx
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';

describe('Header', () => {
  it('should render the header', () => {
    const isActive = true;
    const component = render(
      <MemoryRouter>
        <Header showSidebar={jest.fn()} isActive={isActive} />
      </MemoryRouter>
    );

    expect(component.getByTestId('menu')).toBeDefined();
    expect(component.getByTestId('link-logo')).toBeDefined();
    expect(component.getByTestId('link-profile')).toBeDefined();
    expect(component.getByTestId('icon-close')).toBeDefined();
  });
});
