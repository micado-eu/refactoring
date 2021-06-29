import {DefaultCrudRepository} from '@loopback/repository';
import {TSettingsTranslationProd, TSettingsTranslationProdRelations} from '../models';
import {MicadoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TSettingsTranslationProdRepository extends DefaultCrudRepository<
  TSettingsTranslationProd,
  typeof TSettingsTranslationProd.prototype.id,
  TSettingsTranslationProdRelations
> {
  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource,
  ) {
    super(TSettingsTranslationProd, dataSource);
  }
}
