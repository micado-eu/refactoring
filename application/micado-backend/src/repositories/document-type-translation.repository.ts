import {DefaultCrudRepository} from '@loopback/repository';
import {DocumentTypeTranslation, DocumentTypeTranslationRelations} from '../models';
import {MicadoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';
import { BaseTranslationRepository } from './base-translation.repository';

export class DocumentTypeTranslationRepository extends BaseTranslationRepository<
  DocumentTypeTranslation,
  typeof DocumentTypeTranslation.prototype.id,
  DocumentTypeTranslationRelations
> {
  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource,
  ) {
    super(DocumentTypeTranslation, dataSource);
  }

  getTranslatableColumnNames(): Array<string> {
    return ['document', 'description'];
  }
}
