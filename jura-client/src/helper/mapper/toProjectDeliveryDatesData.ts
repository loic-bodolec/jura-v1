import { getMonth } from 'date-fns';
import { fr } from 'date-fns/locale';

export const MONTHS: string[] = [];
// eslint-disable-next-line no-plusplus
for (let i = 0; i < 12; i++) {
  MONTHS.push(fr.localize?.month(i, { width: 'abbreviated' }));
}

export const toProjectDeliveryDatesData = (projects: { delivered_at: Date }[]) => {
  const deliveredProjects = projects.filter((p) => p.delivered_at !== null);
  const deliveredProjectsMonths: number[] = deliveredProjects.map((p) => getMonth(new Date(p.delivered_at)));

  const projectDeliveredPerMonth: number[] = [];
  MONTHS.forEach((m, i) => {
    const deliveredThisMonth = deliveredProjectsMonths.filter((d) => d === i);
    projectDeliveredPerMonth[i] = deliveredProjectsMonths.length > 0 ? deliveredThisMonth.length : 0;
  });

  return {
    labels: MONTHS,
    datasets: [
      {
        data: projectDeliveredPerMonth
      }
    ]
  };
};
