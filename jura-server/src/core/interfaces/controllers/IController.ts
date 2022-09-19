import IService from '../services/IService';

export interface IController<T> {
  service: IService<T>;
}
