import {DefaultCrudRepository} from '@loopback/repository';
import {MixedIcons, MixedIconsRelations} from '../models';
import {MicadoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class MixedIconsRepository extends DefaultCrudRepository<
MixedIcons,
  typeof MixedIcons.prototype.id,
  MixedIconsRelations
> {
  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource,
  ) {
    super(MixedIcons, dataSource);
  }
}
