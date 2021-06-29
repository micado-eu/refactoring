import {DefaultCrudRepository} from '@loopback/repository';
import {TopicTranslation, TopicTranslationRelations} from '../models';
import {MicadoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';
import { BaseTranslationRepository } from './base-translation.repository';

export class TopicTranslationRepository extends BaseTranslationRepository<
  TopicTranslation,
  typeof TopicTranslation.prototype.id,
  TopicTranslationRelations
> {
  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource,
  ) {
    super(TopicTranslation, dataSource);
  }

  public getTranslatableColumnNames(): Array<string> {
    return ['topic'];
  }
}
