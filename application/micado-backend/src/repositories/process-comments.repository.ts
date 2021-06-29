import {DefaultCrudRepository} from '@loopback/repository';
import {ProcessComments, ProcessCommentsRelations} from '../models';
import {MicadoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ProcessCommentsRepository extends DefaultCrudRepository<
  ProcessComments,
  typeof ProcessComments.prototype.idcomment,
  ProcessCommentsRelations
> {
  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource,
  ) {
    super(ProcessComments, dataSource);
  }
}
