import {DefaultCrudRepository} from '@loopback/repository';
import {DocumentTypeValidator, DocumentTypeValidatorRelations} from '../models';
import {MicadoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class DocumentTypeValidatorRepository extends DefaultCrudRepository<
  DocumentTypeValidator,
  typeof DocumentTypeValidator.prototype.documentTypeId,
  DocumentTypeValidatorRelations
> {
  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource,
  ) {
    super(DocumentTypeValidator, dataSource);
  }
}
