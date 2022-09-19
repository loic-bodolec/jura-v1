import { UpdateUserInput } from '../../services/api/generated/graphql';

export const updatedUser = (): UpdateUserInput => {
  return {
    id: '',
    firstname: '',
    lastname: '',
    job_title: '',
    email: '',
    password: ''
  };
};

// export const hasAllFields = (user: UpdateUserInput): boolean => {
//   const userArray = Object.values(user);
//   return userArray.every((v) => v);
// };
