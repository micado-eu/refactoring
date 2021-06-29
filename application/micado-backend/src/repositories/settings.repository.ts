import {DefaultCrudRepository} from '@loopback/repository';
import {Settings, SettingsRelations} from '../models';
import {MicadoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SettingsRepository extends DefaultCrudRepository<
  Settings,
  typeof Settings.prototype.key,
  SettingsRelations
> {
  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource,
  ) {
    super(Settings, dataSource);
  }
}
