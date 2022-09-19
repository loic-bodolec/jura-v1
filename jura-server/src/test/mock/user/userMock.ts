import { RegisterUserInput } from '../../../resolvers/user/UserInput';
import { getUniqueEmail } from '../../getUniqueEmail';

export const newUserMock: RegisterUserInput = {
  firstname: 'firstname',
  lastname: 'lastname',
  job_title: 'job_title',
  email: getUniqueEmail(),
  password: 'Test-123456',
};
