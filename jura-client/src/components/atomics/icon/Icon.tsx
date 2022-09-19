// TODO use icon for ticket priority

import { ReactElement } from 'react';
import { IconContext } from 'react-icons';
import { AiTwotoneAlert } from 'react-icons/ai';
import { TicketPriority } from '../../../services/models/ticket';

export type IconProps = {
  id: string;
};

export type PriorityIconProps = {
  id: string;
  color?: string;
  icon: ReactElement;
  style?: Record<string, unknown>;
};

export const Icon = ({ id, color, icon, style }: PriorityIconProps) => {
  return (
    <div data-testid={`icon-${id}`} style={style}>
      <IconContext.Provider value={{ color, size: '20' }}>{icon}</IconContext.Provider>
    </div>
  );
};

export const getPriorityIcon = (priority?: TicketPriority) => {
  switch (priority) {
    case TicketPriority.HIGH:
      return <Icon id="high" color="red" icon={<AiTwotoneAlert />} />;
    case TicketPriority.MEDIUM:
      return <Icon id="medium" color="orange" icon={<AiTwotoneAlert />} />;
    case TicketPriority.LOW:
      return <Icon id="low" color="green" icon={<AiTwotoneAlert />} />;
    default:
      return <div data-testid="no-priority" />;
  }
};
