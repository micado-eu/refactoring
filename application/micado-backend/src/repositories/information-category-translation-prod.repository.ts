import {DefaultCrudRepository} from '@loopback/repository';
import {InformationCategoryTranslationProd, InformationCategoryTranslationProdRelations} from '../models';
import {MicadoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class InformationCategoryTranslationProdRepository extends DefaultCrudRepository<
  InformationCategoryTranslationProd,
  typeof InformationCategoryTranslationProd.prototype.id,
  InformationCategoryTranslationProdRelations
> {
  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource,
  ) {
    super(InformationCategoryTranslationProd, dataSource);
  }
}
