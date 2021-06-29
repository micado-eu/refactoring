import {DefaultCrudRepository} from '@loopback/repository';
import {EventTranslationProd, EventTranslationProdRelations} from '../models';
import {MicadoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class EventTranslationProdRepository extends DefaultCrudRepository<
  EventTranslationProd,
  typeof EventTranslationProd.prototype.id,
  EventTranslationProdRelations
> {
  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource,
  ) {
    super(EventTranslationProd, dataSource);
  }
}
