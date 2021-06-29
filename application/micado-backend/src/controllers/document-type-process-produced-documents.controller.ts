import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  DocumentType,
  ProcessProducedDocuments,
} from '../models';
import {DocumentTypeRepository} from '../repositories';

export class DocumentTypeProcessProducedDocumentsController {
  constructor(
    @repository(DocumentTypeRepository) protected documentTypeRepository: DocumentTypeRepository,
  ) { }

  @get('/document-types/{id}/process-produced-documents', {
    responses: {
      '200': {
        description: 'Array of DocumentType has many ProcessProducedDocuments',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ProcessProducedDocuments)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ProcessProducedDocuments>,
  ): Promise<ProcessProducedDocuments[]> {
    return this.documentTypeRepository.generatedBy(id).find(filter);
  }

  @post('/document-types/{id}/process-produced-documents', {
    responses: {
      '200': {
        description: 'DocumentType model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProcessProducedDocuments)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof DocumentType.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProcessProducedDocuments, {
            title: 'NewProcessProducedDocumentsInDocumentType',
            exclude: ['idProcess'],
            optional: ['idDocument']
          }),
        },
      },
    }) processProducedDocuments: Omit<ProcessProducedDocuments, 'idProcess'>,
  ): Promise<ProcessProducedDocuments> {
    return this.documentTypeRepository.generatedBy(id).create(processProducedDocuments);
  }

  @patch('/document-types/{id}/process-produced-documents', {
    responses: {
      '200': {
        description: 'DocumentType.ProcessProducedDocuments PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProcessProducedDocuments, {partial: true}),
        },
      },
    })
    processProducedDocuments: Partial<ProcessProducedDocuments>,
    @param.query.object('where', getWhereSchemaFor(ProcessProducedDocuments)) where?: Where<ProcessProducedDocuments>,
  ): Promise<Count> {
    return this.documentTypeRepository.generatedBy(id).patch(processProducedDocuments, where);
  }

  @del('/document-types/{id}/process-produced-documents', {
    responses: {
      '200': {
        description: 'DocumentType.ProcessProducedDocuments DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ProcessProducedDocuments)) where?: Where<ProcessProducedDocuments>,
  ): Promise<Count> {
    return this.documentTypeRepository.generatedBy(id).delete(where);
  }
}
