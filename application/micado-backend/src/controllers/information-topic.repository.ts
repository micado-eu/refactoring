import {DefaultCrudRepository} from '@loopback/repository';
import {MicadoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';
import { InformationTopicRelations, InformationTopic } from '../models';

export class InformationTopicRepository extends DefaultCrudRepository<
  InformationTopic,
  typeof InformationTopic.prototype.idInformation,
  InformationTopicRelations
> {
  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource,
  ) {
    super(InformationTopic, dataSource);
  }
}
