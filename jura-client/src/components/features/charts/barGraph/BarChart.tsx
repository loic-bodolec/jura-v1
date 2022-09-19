import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { Card } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export interface BarChartProps {
  delivery?: any;
  title?: string;
}

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      display: false
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1
      }
    }
  },
  backgroundColor: 'rgba(75, 192, 192, 0.5)',
  minBarLength: 5
};

export const BarChart = ({ delivery, title }: BarChartProps) => {
  return (
    <Card className="chart-card" style={{ maxWidth: '70rem', marginBottom: '3rem', padding: '0' }}>
      <Card.Header style={{ fontSize: '1rem', marginBottom: '1rem', textAlign: 'center' }}>{title}</Card.Header>
      <Card.Body>
        <Bar data={delivery} style={{ fontSize: '1rem', marginBottom: '1rem' }} options={options} />
      </Card.Body>
    </Card>
  );
};
