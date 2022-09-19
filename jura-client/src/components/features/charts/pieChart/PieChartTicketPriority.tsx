import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Card } from 'react-bootstrap';
import { Pie } from 'react-chartjs-2';
import { Ticket } from '../../../../services/api/generated/graphql';

ChartJS.register(ArcElement, Tooltip, Legend);

export interface PieChartProps {
  tickets?: Array<Ticket>;
  title?: string;
  showTotal?: boolean;
}

export const PieChartTicketsPriority = ({ tickets, title, showTotal }: PieChartProps) => {
  const highTickets = tickets?.filter((ticket) => ticket?.priority === 'HIGH');
  const mediumTickets = tickets?.filter((ticket) => ticket?.priority === 'MEDIUM');
  const lowTickets = tickets?.filter((ticket) => ticket?.priority === 'LOW');

  const data = {
    labels: ['haute', 'moyenne', 'basse'],
    datasets: [
      {
        label: '# of Tickets',
        data: [highTickets?.length, mediumTickets?.length, lowTickets?.length],
        backgroundColor: ['rgba(255, 0, 0, 0.5)', 'rgba(255, 165, 0, 0.5)', 'rgba(46, 139, 87, 0.5)'],
        borderColor: ['rgba(255, 0, 0, 1)', 'rgba(255, 69, 0, 1)', 'rgba(46, 139, 87, 1)'],
        borderWidth: 0,
        hoverOffset: 5
      }
    ]
  };

  return (
    <Card className="chart-card" style={{ maxWidth: '50rem', minHeight: '27rem', marginBottom: '1rem' }}>
      <Card.Header style={{ fontSize: '1rem', marginBottom: '1rem', textAlign: 'center' }}>{title}</Card.Header>
      <Card.Body>
        {showTotal && (
          <Card.Subtitle style={{ fontSize: '1rem', marginBottom: '1rem', textAlign: 'center' }}>total : {tickets?.length}</Card.Subtitle>
        )}
        <Pie data={data} />
      </Card.Body>
    </Card>
  );
};
