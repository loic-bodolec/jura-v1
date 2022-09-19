import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Card } from 'react-bootstrap';
import { Doughnut } from 'react-chartjs-2';
import { Project } from '../../../../services/api/generated/graphql';

ChartJS.register(ArcElement, Tooltip, Legend);

export interface DoughnutChartProps {
  projects?: Array<Project>;
  title?: string;
}

export const DoughnutChart = ({ projects, title }: DoughnutChartProps) => {
  const openProjects = projects?.filter((project) => project?.status === 'OPEN');
  const closedProjects = projects?.filter((project) => project?.status === 'CLOSED');

  const data = {
    labels: ['en cours', 'clos'],
    datasets: [
      {
        label: '# of Tickets',
        data: [openProjects?.length, closedProjects?.length],
        backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(75, 192, 192, 0.5)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)'],
        borderWidth: 0,
        hoverOffset: 5
      }
    ]
  };

  return (
    <Card className="chart-card" style={{ maxWidth: '50rem', minHeight: '27rem', marginBottom: '1rem' }}>
      <Card.Header style={{ fontSize: '1rem', marginBottom: '1rem', textAlign: 'center' }}>{title}</Card.Header>
      <Card.Body>
        <Card.Subtitle style={{ fontSize: '1rem', marginBottom: '1rem', textAlign: 'center' }}>total : {projects?.length}</Card.Subtitle>
        <Doughnut data={data} />
      </Card.Body>
    </Card>
  );
};
