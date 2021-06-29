import {DefaultCrudRepository} from '@loopback/repository';
import {MicadoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';
import { InformationUserTypesRelations, InformationUserTypes } from '../models';

export class InformationUserTypesRepository extends DefaultCrudRepository<
InformationUserTypes,
  typeof InformationUserTypes.prototype.idInformation,
  InformationUserTypesRelations
> {
  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource,
  ) {
    super(InformationUserTypes, dataSource);
  }
}
