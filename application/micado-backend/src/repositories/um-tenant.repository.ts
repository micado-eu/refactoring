import {DefaultCrudRepository} from '@loopback/repository';
import {UmTenant, UmTenantRelations} from '../models';
import {MicadoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class UmTenantRepository extends DefaultCrudRepository<
UmTenant,
  typeof UmTenant.prototype.umId,
  UmTenantRelations
> {
  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource,
  ) {
    super(UmTenant, dataSource);
  }
}
