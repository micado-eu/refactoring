import {DefaultCrudRepository} from '@loopback/repository';
import {EventTagsTranslationProd, EventTagsTranslationProdRelations} from '../models';
import {MicadoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class EventTagsTranslationProdRepository extends DefaultCrudRepository<
  EventTagsTranslationProd,
  typeof EventTagsTranslationProd.prototype.id,
  EventTagsTranslationProdRelations
> {
  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource,
  ) {
    super(EventTagsTranslationProd, dataSource);
  }
}
