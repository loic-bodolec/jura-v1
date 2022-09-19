import { IUserService } from '../interfaces/services/IUserService';

export interface IAuthService {
  userService: IUserService;

  signin: (credentials: { email: string; password: string }) => Promise<string>;
}
