import {DefaultCrudRepository} from '@loopback/repository';
import {EventCategoryTranslationProd, EventCategoryTranslationProdRelations} from '../models';
import {MicadoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class EventCategoryTranslationProdRepository extends DefaultCrudRepository<
  EventCategoryTranslationProd,
  typeof EventCategoryTranslationProd.prototype.id,
  EventCategoryTranslationProdRelations
> {
  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource,
  ) {
    super(EventCategoryTranslationProd, dataSource);
  }
}
