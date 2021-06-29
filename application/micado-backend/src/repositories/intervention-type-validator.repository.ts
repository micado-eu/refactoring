import {DefaultCrudRepository} from '@loopback/repository';
import {InterventionTypeValidator, InterventionTypeValidatorRelations} from '../models';
import {MicadoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class InterventionTypeValidatorRepository extends DefaultCrudRepository<
  InterventionTypeValidator,
  typeof InterventionTypeValidator.prototype.tenantId,
  InterventionTypeValidatorRelations
> {
  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource,
  ) {
    super(InterventionTypeValidator, dataSource);
  }
}
