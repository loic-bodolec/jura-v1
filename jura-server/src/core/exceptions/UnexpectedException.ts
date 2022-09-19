import Exception from './Exception';

export class UnexpectedException extends Exception {
  constructor() {
    super('Something went wrong');
  }
}
