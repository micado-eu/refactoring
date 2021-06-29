import {DefaultCrudRepository} from '@loopback/repository';
import {EventTranslation, EventTranslationRelations} from '../models';
import {MicadoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';
import { BaseTranslationRepository } from './base-translation.repository';

export class EventTranslationRepository extends BaseTranslationRepository<
  EventTranslation,
  typeof EventTranslation.prototype.id,
  EventTranslationRelations
> {
  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource,
  ) {
    super(EventTranslation, dataSource);
  }

  public getTranslatableColumnNames(): Array<string> {
    return ['event', 'description'];
  }
}
