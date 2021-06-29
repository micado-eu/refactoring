import {DefaultCrudRepository} from '@loopback/repository';
import {Ratings, RatingsRelations} from '../models';
import {MicadoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class RatingsRepository extends DefaultCrudRepository<
  Ratings,
  typeof Ratings.prototype.id,
  RatingsRelations
> {
  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource,
  ) {
    super(Ratings, dataSource);
  }
}
