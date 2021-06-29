import {DefaultCrudRepository} from '@loopback/repository';
import {InterventionCategoryTranslationProd, InterventionCategoryTranslationProdRelations} from '../models';
import {MicadoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class InterventionCategoryTranslationProdRepository extends DefaultCrudRepository<
  InterventionCategoryTranslationProd,
  typeof InterventionCategoryTranslationProd.prototype.id,
  InterventionCategoryTranslationProdRelations
> {
  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource,
  ) {
    super(InterventionCategoryTranslationProd, dataSource);
  }
}
