import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {Tenant, TenantRelations, UmTenant} from '../models';
import {MicadoDsDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UmTenantRepository} from './um-tenant.repository';

export class TenantRepository extends DefaultCrudRepository<
  Tenant,
  typeof Tenant.prototype.id,
  TenantRelations
> {

  public readonly tenantData: HasOneRepositoryFactory<UmTenant, typeof Tenant.prototype.id>;

  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource, @repository.getter('UmTenantRepository') protected umTenantRepositoryGetter: Getter<UmTenantRepository>,
  ) {
    super(Tenant, dataSource);
    this.tenantData = this.createHasOneRepositoryFactoryFor('tenantData', umTenantRepositoryGetter);
    this.registerInclusionResolver('tenantData', this.tenantData.inclusionResolver);
  }
}
