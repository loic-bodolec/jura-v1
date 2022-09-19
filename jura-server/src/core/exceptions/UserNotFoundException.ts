import { NotFoundException } from './NotFoundException';

export class UserNotFoundException extends NotFoundException {
  constructor() {
    super('User');
  }
}
