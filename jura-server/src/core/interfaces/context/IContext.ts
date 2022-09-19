import User from '../../../dataLayer/entities/User';

export interface IContext {
  token: string | null;
  user: User | null;
}
