import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Process,
  DocumentType,
} from '../models';
import { ProcessRepository } from '../repositories';

export class ProcessDocumentTypeController {
  constructor(
    @repository(ProcessRepository)
    public processRepository: ProcessRepository,
  ) { }

 /* @get('/processes/{id}/document-type', {
    responses: {
      '200': {
        description: 'DocumentType belonging to Process',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(DocumentType) },
          },
        },
      },
    },
  })
  async getDocumentType (
    @param.path.number('id') id: typeof Process.prototype.id,
  ): Promise<DocumentType> {
    return this.processRepository.process_document(id);
  }*/
}
