import {DefaultCrudRepository} from '@loopback/repository';
import {InformationTagsTranslationProd, InformationTagsTranslationProdRelations} from '../models';
import {MicadoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class InformationTagsTranslationProdRepository extends DefaultCrudRepository<
  InformationTagsTranslationProd,
  typeof InformationTagsTranslationProd.prototype.id,
  InformationTagsTranslationProdRelations
> {
  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource,
  ) {
    super(InformationTagsTranslationProd, dataSource);
  }
}
