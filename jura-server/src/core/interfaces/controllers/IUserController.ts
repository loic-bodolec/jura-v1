import User from '../../../dataLayer/entities/User';
import { RegisterUserInput, UpdateUserInput } from '../../../resolvers/user/UserInput';
import { IContext } from '../context/IContext';

export interface IUserController {
  getAllUsers: () => Promise<User[]>;
  getOneUser: (id: string) => Promise<User>;
  registerUser: (user: RegisterUserInput) => Promise<User>;
  updateUser: (user: UpdateUserInput) => Promise<User>;
  updatePassword: (id: string, password: string) => Promise<boolean>;
  deleteUser: (context: IContext, id: string) => Promise<boolean>;
}
