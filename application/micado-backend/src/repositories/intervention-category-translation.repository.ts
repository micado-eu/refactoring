import {DefaultCrudRepository} from '@loopback/repository';
import {InterventionCategoryTranslation, InterventionCategoryTranslationRelations} from '../models';
import {MicadoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';
import { BaseTranslationRepository } from './base-translation.repository';

export class InterventionCategoryTranslationRepository extends BaseTranslationRepository<
  InterventionCategoryTranslation,
  typeof InterventionCategoryTranslation.prototype.id,
  InterventionCategoryTranslationRelations
> {
  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource,
  ) {
    super(InterventionCategoryTranslation, dataSource);
  }

  public getTranslatableColumnNames(): Array<string> {
    return ['title'];
  }
}
