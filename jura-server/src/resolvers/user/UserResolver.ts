import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  Float,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql';
import { IContext } from '../../core/interfaces/context/IContext';
import { IUserController } from '../../core/interfaces/controllers/IUserController';
import User, { Role } from '../../dataLayer/entities/User';
import { TicketService } from '../../domain/services/ticket/TicketService';
import { UserService } from '../../domain/services/user/UserService';
import { RegisterUserInput, UpdateUserInput } from './UserInput';

@Resolver(() => User)
export class UserResolver implements IUserController {
  private service: UserService = new UserService();

  @Authorized()
  @Query(() => [User])
  async getAllUsers(): Promise<User[]> {
    const results = await this.service.getAll();
    return results;
  }

  @Authorized()
  @Query(() => User)
  getProfile(@Ctx() context: IContext): Promise<User> {
    if (context.user) {
      return Promise.resolve(context.user);
    }
    throw new Error('Profile not found');
  }

  @Authorized()
  @Query(() => User)
  async getOneUser(@Arg('id') id: string): Promise<User> {
    const result = await this.service.getOne(id);
    if (result) {
      return result;
    }
    throw new Error('User not found');
  }

  @Mutation(() => User)
  async registerUser(@Arg('userInput') user: RegisterUserInput): Promise<User> {
    const result = await this.service.register(user);
    if (result) {
      return result;
    }
    throw new Error('User not registered');
  }

  @Authorized()
  @Mutation(() => User)
  async updateUser(@Arg('userInput') user: UpdateUserInput): Promise<User> {
    const result = await this.service.update(user);
    if (result) {
      return result;
    }
    throw new Error('User not updated');
  }

  @Authorized()
  @Mutation(() => Boolean)
  async updatePassword(@Arg('id') id: string, @Arg('password') password: string): Promise<boolean> {
    await this.service.updatePassword(id, password);
    return true;
  }

  @Authorized(Role.ADMIN) // only admin can delete a user
  @Mutation(() => Boolean)
  async deleteUser(@Ctx() context: IContext, @Arg('id') id: string): Promise<boolean> {
    if (context.user) {
      await this.service.delete(id, context.user);
      return true;
    }
    throw new Error('User not deleted');
  }

  @FieldResolver(() => Float)
  async averageTimePerTicket(@Root() user: User): Promise<number> {
    const service = new TicketService();

    const result = await service.getAllByUser(user.id);
    const spendTime = result.map((t) => t.spent_time ?? 0);
    const average = spendTime.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      0,
    );
    return Math.round(average / spendTime.length);
  }
}
