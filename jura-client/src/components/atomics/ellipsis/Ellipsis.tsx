import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { AiOutlineEllipsis } from 'react-icons/ai';
import { Action } from '../../../services/models/action';
import { Icon } from '../icon/Icon';

export type EllipsisProps = {
  actions: Action[];
  onAction: (action: Action, item: any) => void;
  element: any;
};

const id = 'ellipsis';

const CustomToggle = React.forwardRef<HTMLAnchorElement>(({ children, onClick }: any, ref) => (
  <a
    data-testid={`${id}-toggle`}
    href=""
    aria-label="More actions"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    <Icon id={id} icon={<AiOutlineEllipsis />} />
    {children}
  </a>
));

export const Ellipsis = ({ actions, onAction, element }: EllipsisProps) => {
  return (
    <Dropdown data-testid={id}>
      <Dropdown.Toggle as={CustomToggle} />
      <Dropdown.Menu data-testid={`${id}-menu`}>
        {actions.map((a: Action) => {
          const actionId = `${id}-menu-item-${a.type}`;
          return (
            <Dropdown.Item key={actionId} data-testid={actionId} onClick={() => onAction(a, element)}>
              {a.title}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
};
