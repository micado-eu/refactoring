import {DefaultCrudRepository} from '@loopback/repository';
import {UserTypesTranslationProd, UserTypesTranslationProdRelations} from '../models';
import {MicadoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class UserTypesTranslationProdRepository extends DefaultCrudRepository<
  UserTypesTranslationProd,
  typeof UserTypesTranslationProd.prototype.id,
  UserTypesTranslationProdRelations
> {
  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource,
  ) {
    super(UserTypesTranslationProd, dataSource);
  }
}
