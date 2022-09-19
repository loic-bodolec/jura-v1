// TODO update Footer.test.tsx
import { render } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
  it('should render the footer', () => {
    const component = render(<Footer />);

    expect(component.getByTestId('container')).toBeDefined();
    expect(component.getByTestId('link')).toBeDefined();
  });
});
