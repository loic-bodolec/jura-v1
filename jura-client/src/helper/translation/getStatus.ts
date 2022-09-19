import { ProjectStatus } from '../../services/models/project';

export const getStatusTranslation = (status: ProjectStatus) => {
  switch (status) {
    case ProjectStatus.OPEN:
      return 'En cours';
    case ProjectStatus.CLOSED:
      return 'Clos';
  }
};
