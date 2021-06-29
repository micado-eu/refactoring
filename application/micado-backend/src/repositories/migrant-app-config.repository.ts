import {DefaultCrudRepository} from '@loopback/repository';
import {MigrantAppConfig, MigrantAppConfigRelations} from '../models';
import {MicadoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class MigrantAppConfigRepository extends DefaultCrudRepository<
  MigrantAppConfig,
  typeof MigrantAppConfig.prototype.id,
  MigrantAppConfigRelations
> {
  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource,
  ) {
    super(MigrantAppConfig, dataSource);
  }
}
