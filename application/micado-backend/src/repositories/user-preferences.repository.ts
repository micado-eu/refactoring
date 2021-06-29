import {DefaultCrudRepository} from '@loopback/repository';
import {UserPreferences, UserPreferencesRelations} from '../models';
import {MicadoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class UserPreferencesRepository extends DefaultCrudRepository<
  UserPreferences,
  typeof UserPreferences.prototype.idUser,
  UserPreferencesRelations
> {
  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource,
  ) {
    super(UserPreferences, dataSource);
  }
}
