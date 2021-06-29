import {DefaultCrudRepository} from '@loopback/repository';
import {InterventionTypesTranslation, InterventionTypesTranslationRelations} from '../models';
import {MicadoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';
import { BaseTranslationRepository } from './base-translation.repository';

export class InterventionTypesTranslationRepository extends BaseTranslationRepository<
  InterventionTypesTranslation,
  typeof InterventionTypesTranslation.prototype.id,
  InterventionTypesTranslationRelations
> {
  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource,
  ) {
    super(InterventionTypesTranslation, dataSource);
  }

  public getTranslatableColumnNames(): Array<string> {
    return ['intervention_title', 'description'];
  }
}
