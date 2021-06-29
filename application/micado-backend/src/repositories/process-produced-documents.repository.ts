import {DefaultCrudRepository} from '@loopback/repository';
import {ProcessProducedDocuments, ProcessProducedDocumentsRelations} from '../models';
import {MicadoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ProcessProducedDocumentsRepository extends DefaultCrudRepository<
  ProcessProducedDocuments,
  typeof ProcessProducedDocuments.prototype.idProcess,
  ProcessProducedDocumentsRelations
> {
  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource,
  ) {
    super(ProcessProducedDocuments, dataSource);
  }
}
