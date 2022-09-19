import { Action, ProjectAction, PROJECT_ACTIONS } from '../../services/models/action';
import { ProjectStatus } from '../../services/models/project';

export const getProjectActions = (projectStatus: string): Action[] | undefined => {
  switch (projectStatus) {
    case ProjectStatus.OPEN:
      return PROJECT_ACTIONS.filter((a) => a.type === ProjectAction.CLOSE);
    case ProjectStatus.CLOSED:
      return PROJECT_ACTIONS.filter((a) => a.type === ProjectAction.OPEN);
    default:
      break;
  }
};
