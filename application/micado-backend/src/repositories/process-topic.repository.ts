import {DefaultCrudRepository} from '@loopback/repository';
import {ProcessTopic, ProcessTopicRelations} from '../models';
import {MicadoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ProcessTopicRepository extends DefaultCrudRepository<
  ProcessTopic,
  typeof ProcessTopic.prototype.idProcess,
  ProcessTopicRelations
> {
  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource,
  ) {
    super(ProcessTopic, dataSource);
  }
}
