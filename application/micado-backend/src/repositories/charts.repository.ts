import {DefaultCrudRepository} from '@loopback/repository';
import {Charts, ChartsRelations} from '../models';
import {MicadoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ChartsRepository extends DefaultCrudRepository<
  Charts,
  typeof Charts.prototype.id,
  ChartsRelations
> {
  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource,
  ) {
    super(Charts, dataSource);
  }
}
