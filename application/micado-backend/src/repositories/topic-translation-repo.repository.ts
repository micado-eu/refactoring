import {DefaultCrudRepository} from '@loopback/repository';
import {TopicTranslation, TopicTranslationRelations} from '../models';
import {MicadoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TopicTranslationRepoRepository extends DefaultCrudRepository<
  TopicTranslation,
  typeof TopicTranslation.prototype.id,
  TopicTranslationRelations
> {
  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource,
  ) {
    super(TopicTranslation, dataSource);
  }
}
