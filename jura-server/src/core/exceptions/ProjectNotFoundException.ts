import { NotFoundException } from './NotFoundException';

export class ProjectNotFoundException extends NotFoundException {
  constructor() {
    super('Project');
  }
}
