import {DefaultCrudRepository} from '@loopback/repository';
import {FeaturesFlagsTranslationProd, FeaturesFlagsTranslationProdRelations} from '../models';
import {MicadoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class FeaturesFlagsTranslationProdRepository extends DefaultCrudRepository<
  FeaturesFlagsTranslationProd,
  typeof FeaturesFlagsTranslationProd.prototype.id,
  FeaturesFlagsTranslationProdRelations
> {
  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource,
  ) {
    super(FeaturesFlagsTranslationProd, dataSource);
  }
}
