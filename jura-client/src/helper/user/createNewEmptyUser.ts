import { RegisterUserInput } from '../../services/api/generated/graphql';

export const createNewEmptyUser = (): RegisterUserInput => {
  return {
    firstname: '',
    lastname: '',
    job_title: '',
    email: '',
    password: ''
  };
};

export const hasAllFields = (user: RegisterUserInput): boolean => {
  const userArray = Object.values(user);
  return userArray.every((v) => v);
};
