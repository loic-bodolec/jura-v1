import PasswordValidator from 'password-validator';
import { getConnection } from 'typeorm';
import Exception from '../../../core/exceptions/Exception';
import { UnexpectedException } from '../../../core/exceptions/UnexpectedException';
import { UserNotFoundException } from '../../../core/exceptions/UserNotFoundException';
import { IUserService } from '../../../core/interfaces/services/IUserService';
import User, { Role } from '../../../dataLayer/entities/User';
import { UserRepository } from '../../../dataLayer/repositories/UserRepository';

export class UserService implements IUserService {
  private repository = getConnection().getCustomRepository(UserRepository);

  /**
   * Retrieve all the users
   * @returns {Promise<User[]>} the users
   */
  public async getAll(): Promise<User[]> {
    const results = await this.repository.find();
    if (!results) throw new UnexpectedException();
    return results;
  }

  /**
   * Retrieve one user by id
   * @throws will throw an error if the user is not found
   * @returns {Promise<User>} the user
   */
  public async getOne(id: string): Promise<User> {
    const result = await this.repository.findOne({ id });
    if (!result) throw new UserNotFoundException();
    return result;
  }

  /**
   * Retrieve one user by email
   * @throws will throw an error if the user is not found
   * @returns {Promise<User>} the user
   */
  public async getOneByEmail(email: string): Promise<User> {
    const result = await this.repository.findOne({ email });
    if (!result) throw new UserNotFoundException();
    return result;
  }

  /**
   * Retrieve many user by id
   * @throws will throw an error if a user is not found
   * @returns {Promise<User[]>} the users
   */
  public async getMany(ids: string[]): Promise<User[]> {
    const results = await this.repository.findManyByIds(ids);
    if (results.length !== ids.length) {
      throw new UserNotFoundException();
    }
    return results;
  }

  /**
   * Create a user
   * @param {user}
   * @returns {Promise<User>} the user
   */
  public async register(user: {
    firstname: string;
    lastname: string;
    job_title: string;
    email: string;
    password: string;
  }): Promise<User> {
    const passwordSchema = new PasswordValidator();
    passwordSchema
      .is()
      .min(8) // Minimum length 8
      .max(30) // Maximum length 30
      .has()
      .uppercase(1) // Must have at least 1 uppercase letter
      .has()
      .lowercase() // Must have lowercase letters
      .has()
      .symbols(1) // Must have at least 1 symbol
      .has()
      .digits(2) // Must have at least 2 digits
      .has()
      .not()
      .spaces() // Should not have spaces
      .is()
      .not()
      .oneOf(['Password12', 'Password123']); // Blacklist these values
    if (!passwordSchema.validate(user.password)) {
      throw new Exception(
        'Ton mot de passe doit être entre 8 et 30 caractères (au moins 1 majuscule, au moins 2 chiffres, au moins 1 symbole et sans espace)!',
      );
    } else {
      const newUser = this.repository.create(user);
      await newUser.hashPassword();
      const result = await this.repository.save(newUser);
      if (!result) throw new UnexpectedException();
      return result;
    }
  }

  /**
   * Update a user
   * @param {user}
   * @throws will throw an error if the user is not updated
   * @returns {Promise<User>} the user
   */
  public async update(user: {
    id: string;
    firstname?: string;
    lastname?: string;
    job_title?: string;
    email?: string;
  }): Promise<User> {
    const result = await this.repository.update(user.id, user);
    if (!result.affected) throw new UnexpectedException();
    const updatedUser = await this.getOne(user.id);
    return updatedUser;
  }

  /**
   * Update the user's password
   * @param  {string} id
   * @param  {string} password
   * @throws will throw an error if the password is not updated
   * @returns {void}
   */
  public async updatePassword(id: string, password: string): Promise<void> {
    const user = await this.getOne(id);
    user.password = password;
    await user.hashPassword();
    const result = await this.repository.update(user.id, user);
    if (!result.affected) throw new UnexpectedException();
  }

  /**
   * Delete a user
   * @param {id} string the user id
   * @throws will throw an error if the user is not deleted
   * @returns {void}
   */
  public async delete(id: string, user: User): Promise<void> {
    try {
      if (user.role === Role.ADMIN) {
        // clear all relations with project
        await this.repository.removeUserFromProjects(id);
        await this.repository.removeOwnerFromProjects(id);
        await this.repository.removeUserFromTickets(id);

        // now the user can be deleted
        const result = await this.repository.delete({ id });
        if (!result.affected) throw new UnexpectedException();
      }
    } catch (error) {
      throw new UnexpectedException();
    }
  }
}
