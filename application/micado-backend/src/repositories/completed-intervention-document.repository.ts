import {DefaultCrudRepository} from '@loopback/repository';
import {CompletedInterventionDocument, CompletedInterventionDocumentRelations} from '../models';
import {MicadoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CompletedInterventionDocumentRepository extends DefaultCrudRepository<
  CompletedInterventionDocument,
  typeof CompletedInterventionDocument.prototype.idDocument,
  CompletedInterventionDocumentRelations
> {
  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource,
  ) {
    super(CompletedInterventionDocument, dataSource);
  }
}
