import {DefaultCrudRepository} from '@loopback/repository';
import {UserPictures, UserPicturesRelations} from '../models';
import {MicadoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class UserPicturesRepository extends DefaultCrudRepository<
  UserPictures,
  typeof UserPictures.prototype.id,
  UserPicturesRelations
> {
  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource,
  ) {
    super(UserPictures, dataSource);
  }
}
