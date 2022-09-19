export enum ProjectAction {
  CLOSE = 'CLOSE',
  OPEN = 'OPEN'
}

enum TicketAction {}

type ActionType = ProjectAction | TicketAction;

export interface Action {
  type: ActionType;
  title: string;
}

export const PROJECT_ACTIONS: Action[] = [
  {
    type: ProjectAction.CLOSE,
    title: 'Fermer'
  },
  {
    type: ProjectAction.OPEN,
    title: 'Ouvrir'
  }
];
