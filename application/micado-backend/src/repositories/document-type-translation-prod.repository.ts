import {DefaultCrudRepository} from '@loopback/repository';
import {DocumentTypeTranslationProd, DocumentTypeTranslationProdRelations} from '../models';
import {MicadoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class DocumentTypeTranslationProdRepository extends DefaultCrudRepository<
  DocumentTypeTranslationProd,
  typeof DocumentTypeTranslationProd.prototype.id,
  DocumentTypeTranslationProdRelations
> {
  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource,
  ) {
    super(DocumentTypeTranslationProd, dataSource);
  }
}
