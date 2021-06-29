import {DefaultCrudRepository} from '@loopback/repository';
import {MicadoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';
import { EventTopicRelations, EventTopic } from '../models';

export class EventTopicRepository extends DefaultCrudRepository<
  EventTopic,
  typeof EventTopic.prototype.idEvent,
  EventTopicRelations
> {
  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource,
  ) {
    super(EventTopic, dataSource);
  }
}
