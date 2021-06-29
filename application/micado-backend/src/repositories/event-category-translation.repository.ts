import {DefaultCrudRepository} from '@loopback/repository';
import {EventCategoryTranslation, EventCategoryTranslationRelations} from '../models';
import {MicadoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';
import { BaseTranslationRepository } from './base-translation.repository';

export class EventCategoryTranslationRepository extends BaseTranslationRepository<
  EventCategoryTranslation,
  typeof EventCategoryTranslation.prototype.id,
  EventCategoryTranslationRelations
> {
  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource,
  ) {
    super(EventCategoryTranslation, dataSource);
  }
}
