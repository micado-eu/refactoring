import {DefaultCrudRepository} from '@loopback/repository';
import {TSettingsTranslation, TSettingsTranslationRelations} from '../models';
import {MicadoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TSettingsTranslationRepository extends DefaultCrudRepository<
  TSettingsTranslation,
  typeof TSettingsTranslation.prototype.id,
  TSettingsTranslationRelations
> {
  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource,
  ) {
    super(TSettingsTranslation, dataSource);
  }
}
