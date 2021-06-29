import {DefaultCrudRepository} from '@loopback/repository';
import {ProcessTranslation, ProcessTranslationRelations} from '../models';
import {MicadoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';
import { BaseTranslationRepository } from './base-translation.repository';

export class ProcessTranslationRepository extends BaseTranslationRepository<
  ProcessTranslation,
  typeof ProcessTranslation.prototype.id,
  ProcessTranslationRelations
> {
  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource,
  ) {
    super(ProcessTranslation, dataSource);
  }

  public getTranslatableColumnNames(): Array<string> {
    return ['process', 'description'];
  }
}
