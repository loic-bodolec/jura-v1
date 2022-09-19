import Exception from './Exception';

export class ActionException extends Exception {
  constructor() {
    super('You are not allowed to perform this action');
  }
}
