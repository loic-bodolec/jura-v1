import { DeleteResult, EntityRepository, getConnection, Repository } from 'typeorm';
import User from '../entities/User';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  findManyByIds(ids: string[]): Promise<User[]> {
    return this.createQueryBuilder('user').where('user.id IN (:...ids)', { ids }).getMany();
  }

  async removeUserFromProjects(id: string): Promise<DeleteResult> {
    const deletedResult = await getConnection()
      .createQueryBuilder()
      .delete()
      .from('project_members_user')
      .where('userId = :id', { id })
      .execute();

    return deletedResult;
  }

  async removeOwnerFromProjects(id: string): Promise<void> {
    await this.createQueryBuilder().relation(User, 'projects').of(id).add(null);
  }

  async removeUserFromTickets(id: string): Promise<DeleteResult> {
    const deletedResult = await getConnection()
      .createQueryBuilder()
      .delete()
      .from('ticket_users_user')
      .where('userId = :id', { id })
      .execute();

    return deletedResult;
  }
}
