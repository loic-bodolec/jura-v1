import { AiTwotoneAlert } from 'react-icons/ai';
import { TicketPriority } from '../../../services/models/ticket';
import { getPriorityIcon, Icon } from './Icon';

describe('Icons', () => {
  describe('Ticket priority icons', () => {
    it('should return high priority icon', () => {
      const icon = getPriorityIcon(TicketPriority.HIGH);

      expect(icon).toEqual(<Icon id="high" color="red" icon={<AiTwotoneAlert />} />);
    });

    it('should return medium priority icon', () => {
      const icon = getPriorityIcon(TicketPriority.MEDIUM);

      expect(icon).toEqual(<Icon id="medium" color="orange" icon={<AiTwotoneAlert />} />);
    });

    it('should return low priority icon', () => {
      const icon = getPriorityIcon(TicketPriority.LOW);

      expect(icon).toEqual(<Icon id="low" color="green" icon={<AiTwotoneAlert />} />);
    });

    it('should return an empty div', () => {
      const icon = getPriorityIcon(undefined);

      expect(icon).toEqual(<div data-testid="no-priority" />);
    });
  });
});
