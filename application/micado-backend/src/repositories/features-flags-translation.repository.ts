import {DefaultCrudRepository} from '@loopback/repository';
import {FeaturesFlagsTranslation, FeaturesFlagsTranslationRelations} from '../models';
import {MicadoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';
import { BaseTranslationRepository } from './base-translation.repository';

export class FeaturesFlagsTranslationRepository extends BaseTranslationRepository<
  FeaturesFlagsTranslation,
  typeof FeaturesFlagsTranslation.prototype.id,
  FeaturesFlagsTranslationRelations
> {
  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource,
  ) {
    super(FeaturesFlagsTranslation, dataSource);
  }

  public getTranslatableColumnNames(): Array<string> {
    return ['feature'];
  }
}
