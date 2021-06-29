import {DefaultCrudRepository} from '@loopback/repository';
import {TopicTranslationProd, TopicTranslationProdRelations} from '../models';
import {MicadoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TopicTranslationProdRepository extends DefaultCrudRepository<
  TopicTranslationProd,
  typeof TopicTranslationProd.prototype.id,
  TopicTranslationProdRelations
> {
  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource,
  ) {
    super(TopicTranslationProd, dataSource);
  }
}
