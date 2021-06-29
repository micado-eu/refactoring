import {DefaultCrudRepository} from '@loopback/repository';
import {UserConsent, UserConsentRelations} from '../models';
import {MicadoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class UserConsentRepository extends DefaultCrudRepository<
  UserConsent,
  typeof UserConsent.prototype.idUser,
  UserConsentRelations
> {
  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource,
  ) {
    super(UserConsent, dataSource);
  }
}
