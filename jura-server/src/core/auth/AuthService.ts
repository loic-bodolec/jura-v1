import { ApolloError } from 'apollo-server';
import { UserService } from '../../domain/services/user/UserService';
import { IUserService } from '../interfaces/services/IUserService';
import { IAuthService } from './IAuthService';
import { JWTService } from './jwt/JWTService';

export class AuthService implements IAuthService {
  public userService: IUserService = new UserService();

  public jwtService = new JWTService();

  public async signin({ email, password }: { email: string; password: string }): Promise<string> {
    const user = await this.userService.getOneByEmail(email);
    const isValidCredentials = await user.verifyPassword(password);

    if (!isValidCredentials) throw new ApolloError('invalid credentials');
    const token = this.jwtService.generateToken({ userId: user.id, role: user.role });
    return token;
  }
}
