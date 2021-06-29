import {DefaultCrudRepository} from '@loopback/repository';
import {UserAttribute, UserAttributeRelations} from '../models';
import {MicadoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class UserAttributeRepository extends DefaultCrudRepository<
  UserAttribute,
  typeof UserAttribute.prototype.umId,
  UserAttributeRelations
> {
  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource,
  ) {
    super(UserAttribute, dataSource);
  }
}
