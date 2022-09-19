import Exception from './Exception';

export class NotFoundException extends Exception {
  constructor(entity: string) {
    super(`${entity} not found`);
  }
}
