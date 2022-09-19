import { Badge } from 'react-bootstrap';
import { AiOutlineFieldTime } from 'react-icons/ai';
import { getDateBagdeDisplayDate, getDaysDiff } from '../../../helper/time/timerHelper';
import { Icon } from '../icon/Icon';

export type DateBadgeProps = {
  dueDate: Date;
};

export const getDueDateColor = (dueDate: Date): string => {
  const diffDays = getDaysDiff(dueDate);
  if (diffDays >= 7) return 'success';
  if (diffDays >= 3) return 'warning';
  return 'danger';
};

export const DateBadge = ({ dueDate }: DateBadgeProps) => {
  return (
    <Badge bg={getDueDateColor(dueDate)} data-testid="dateBadge">
      <div className="d-flex justify-content-center align-items-center space-around">
        <Icon id="time" style={{ marginRight: '8px' }} icon={<AiOutlineFieldTime />} />
        {getDateBagdeDisplayDate(dueDate)}
      </div>
    </Badge>
  );
};
