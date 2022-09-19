import { Popover } from 'react-bootstrap';

export const popoverHoverFocus = (text: string) => (
  <Popover id="popover-trigger-hover-focus" title="Popover bottom" style={{ padding: '0.5rem' }}>
    <strong>{text}</strong>
  </Popover>
);
