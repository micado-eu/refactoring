import {DefaultCrudRepository} from '@loopback/repository';
import {UserTypesTranslation, UserTypesTranslationRelations} from '../models';
import {MicadoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';
import { BaseTranslationRepository } from './base-translation.repository';

export class UserTypesTranslationRepository extends BaseTranslationRepository<
  UserTypesTranslation,
  typeof UserTypesTranslation.prototype.id,
  UserTypesTranslationRelations
> {
  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource,
  ) {
    super(UserTypesTranslation, dataSource);
  }

  public getTranslatableColumnNames(): Array<string> {
    return ['user_type', 'description'];
  }
}
