import {DefaultCrudRepository} from '@loopback/repository';
import {MicadoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';
import { EventUserTypesRelations, EventUserTypes } from '../models';

export class EventUserTypesRepository extends DefaultCrudRepository<
EventUserTypes,
  typeof EventUserTypes.prototype.idEvent,
  EventUserTypesRelations
> {
  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource,
  ) {
    super(EventUserTypes, dataSource);
  }
}
