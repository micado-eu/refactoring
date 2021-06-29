import {DefaultCrudRepository} from '@loopback/repository';
import {InformationTranslation, InformationTranslationRelations} from '../models';
import {MicadoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';
import { BaseTranslationRepository } from './base-translation.repository';

export class InformationTranslationRepository extends BaseTranslationRepository<
  InformationTranslation,
  typeof InformationTranslation.prototype.id,
  InformationTranslationRelations
> {
  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource,
  ) {
    super(InformationTranslation, dataSource);
  }

  public getTranslatableColumnNames(): Array<string> {
    return ['information', 'description'];
  }
}
