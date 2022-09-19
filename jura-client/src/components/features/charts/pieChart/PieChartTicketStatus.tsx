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

export const PieChartTicketsStatus = ({ tickets, title, showTotal }: PieChartProps) => {
  const toDoTickets = tickets?.filter((ticket) => ticket?.status === 'à faire');
  const inProgressTickets = tickets?.filter((ticket) => ticket?.status === 'en cours');
  const toValidateTickets = tickets?.filter((ticket) => ticket?.status === 'à valider');
  const closedTickets = tickets?.filter((ticket) => ticket?.status === 'clos');

  const data = {
    labels: ['à faire', 'en cours', 'à valider', 'clos'],
    datasets: [
      {
        label: '# of Tickets',
        data: [toDoTickets?.length, inProgressTickets?.length, toValidateTickets?.length, closedTickets?.length],
        backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(255, 206, 86, 0.5)', 'rgba(102,205,170, 0.5)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)'],
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
