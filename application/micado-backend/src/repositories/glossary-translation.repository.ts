import {DefaultCrudRepository} from '@loopback/repository';
import {GlossaryTranslation, GlossaryTranslationRelations} from '../models';
import {MicadoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';
import { BaseTranslationRepository } from './base-translation.repository';

export class GlossaryTranslationRepository extends BaseTranslationRepository<
  GlossaryTranslation,
  typeof GlossaryTranslation.prototype.id,
  GlossaryTranslationRelations
> {
  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource,
  ) {
    super(GlossaryTranslation, dataSource);
  }

  public getTranslatableColumnNames(): Array<string> {
    return ['title', 'description'];
  }
}
