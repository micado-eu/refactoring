import {DefaultCrudRepository} from '@loopback/repository';
import {StepDocument, StepDocumentRelations} from '../models';
import {MicadoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class StepDocumentRepository extends DefaultCrudRepository<
  StepDocument,
  typeof StepDocument.prototype.idStep,
  StepDocumentRelations
> {
  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource,
  ) {
    super(StepDocument, dataSource);
  }
}
