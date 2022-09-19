import { AuthChecker } from 'type-graphql';
import { UserService } from '../../../domain/services/user/UserService';
import { UserNotFoundException } from '../../exceptions/UserNotFoundException';
import { IContext } from '../../interfaces/context/IContext';
import { JWTService } from '../jwt/JWTService';

export const customAuthChecker: AuthChecker<IContext> = async ({ context }, roles) => {
  const userService = new UserService();
  const jwtService = new JWTService();
  const userJwt = context.token;
  if (!userJwt) return false;

  try {
    const decoded = jwtService.verifyToken(userJwt);

    if (!decoded.userId || (roles.length > 0 && !roles.includes(decoded.role))) return false;

    const user = await userService.getOne(decoded.userId);
    if (!user) throw new UserNotFoundException();
    context.user = user;
    return true;
  } catch (err) {
    return false;
  }
};
