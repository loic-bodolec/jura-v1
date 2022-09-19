import { Credentials } from '../../../resolvers/auth/AuthInput';
import { AuthService } from '../../auth/AuthService';

export interface IAuthController {
  service: AuthService;

  signin: (credentials: Credentials) => Promise<string>;
}
