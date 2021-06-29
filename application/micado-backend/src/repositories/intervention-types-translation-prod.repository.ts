import {DefaultCrudRepository} from '@loopback/repository';
import {InterventionTypesTranslationProd, InterventionTypesTranslationProdRelations} from '../models';
import {MicadoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class InterventionTypesTranslationProdRepository extends DefaultCrudRepository<
  InterventionTypesTranslationProd,
  typeof InterventionTypesTranslationProd.prototype.id,
  InterventionTypesTranslationProdRelations
> {
  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource,
  ) {
    super(InterventionTypesTranslationProd, dataSource);
  }
}
