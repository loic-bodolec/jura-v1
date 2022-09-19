import { Repository } from 'typeorm';

interface IService<T> {
  repository: Repository<T>;
}

export default IService;
