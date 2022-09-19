import User from '../../../dataLayer/entities/User';

export interface IUserService {
  getAll: () => Promise<User[]>;
  getOne: (id: string) => Promise<User>;
  getOneByEmail: (email: string) => Promise<User>;
  register: (user: {
    firstname: string;
    lastname: string;
    job_title: string;
    email: string;
    password: string;
  }) => Promise<User>;
  update: (user: {
    id: string;
    firstname?: string;
    lastname?: string;
    job_title?: string;
    email?: string;
    password?: string;
  }) => Promise<User>;
  updatePassword: (id: string, password: string) => Promise<void>;
  delete: (id: string, identity: User) => Promise<void>;
}
