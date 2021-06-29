import {DefaultCrudRepository} from '@loopback/repository';
import {ProcessUsers, ProcessUsersRelations} from '../models';
import {MicadoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ProcessUsersRepository extends DefaultCrudRepository<
  ProcessUsers,
  typeof ProcessUsers.prototype.idProcess,
  ProcessUsersRelations
> {
  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource,
  ) {
    super(ProcessUsers, dataSource);
  }
}
