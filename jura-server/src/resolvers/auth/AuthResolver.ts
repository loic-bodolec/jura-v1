import { Arg, Mutation, Resolver } from 'type-graphql';
import { AuthService } from '../../core/auth/AuthService';
import { IAuthController } from '../../core/interfaces/controllers/IAuthController';
import { Credentials } from './AuthInput';

@Resolver()
export class AuthResolver implements IAuthController {
  public service: AuthService = new AuthService();

  @Mutation(() => String)
  async signin(@Arg('credentials') credentials: Credentials): Promise<string> {
    const result = await this.service.signin(credentials);
    return result;
  }
}
