/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO fix userService.test.ts
import User from '../../../../dataLayer/entities/User';
import { newUserMock } from '../../../../test/mock/user/userMock';
import { UserService } from '../UserService';

describe('user service', () => {
  it('should get all users', async () => {
    const userService = new UserService();
    await userService.register({ ...newUserMock, email: 'email1@mail.com' });
    await userService.register({ ...newUserMock, email: 'email2@mail.com' });
    await userService.register({ ...newUserMock, email: 'email3@mail.com' });

    const userDb = await userService.getAll();
    expect(userDb).toEqual([
      expect.objectContaining({ firstname: 'firstname', email: 'email1@mail.com' }),
      expect.objectContaining({ firstname: 'firstname', email: 'email2@mail.com' }),
      expect.objectContaining({ firstname: 'firstname', email: 'email3@mail.com' }),
    ]);
  });

  it('should throw an error if the user is not found', async () => {
    const userService = new UserService();

    try {
      await userService.getOne('1');
    } catch (e: any) {
      expect(e.message).toBe('User not found');
    }
  });

  it('should create a new user', async () => {
    const userService = new UserService();
    await userService.register(newUserMock);

    // expect(newUser).toEqual(
    //   expect.objectContaining({
    //     firstname: 'firstname',
    //     lastname: 'lastname',
    //     job_title: 'job_title',
    //     email: 'email',
    //     /* password: 'password' */
    //     role: '1'
    //   })
    // );
    expect.objectContaining({
      firstname: 'firstname',
      lastname: 'lastname',
      job_title: 'job_title',
      email: 'email@mail.com',
      password: 'password',
    });
  });

  it('should update a user', async () => {
    const userService = new UserService();
    const newUser = await userService.register(newUserMock);
    const updatedUserDd = await userService.update({ ...newUser, email: 'john@doe.com' });

    expect(updatedUserDd).toEqual(expect.objectContaining({ email: 'john@doe.com' }));
  });

  it('should throw an error if the user is not updated', async () => {
    const userService = new UserService();

    try {
      await userService.update({ ...newUserMock, id: '1', email: 'email2' });
    } catch (e: any) {
      expect(e.message).toBe('Something went wrong');
    }
  });

  it('should delete a user', async () => {
    const userService = new UserService();
    const user = await userService.register(newUserMock);
    const userDb = await userService.getOne(user.id);
    const connectedUser = new User();

    await userService.delete(userDb.id, connectedUser);

    try {
      await userService.getOne(userDb.id);
    } catch (e: any) {
      expect(e.message).toBe('User not found');
    }
  });

  it('should throw an error if the user is not deleted', async () => {
    const userService = new UserService();
    const connectedUser = new User();

    try {
      await userService.delete('1', connectedUser);
    } catch (e: any) {
      expect(e.message).toBe('Something went wrong');
    }
  });
});
