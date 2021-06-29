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
  Document,
  DocumentType,
} from '../models';
import {DocumentRepository} from '../repositories';

export class DocumentDocumentTypeController {
  constructor(
    @repository(DocumentRepository) protected documentRepository: DocumentRepository,
  ) { }

  @get('/documents/{id}/document-type', {
    responses: {
      '200': {
        description: 'Document has one DocumentType',
        content: {
          'application/json': {
            schema: getModelSchemaRef(DocumentType),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<DocumentType>,
  ): Promise<DocumentType> {
    return this.documentRepository.documentType(id).get(filter);
  }

  @post('/documents/{id}/document-type', {
    responses: {
      '200': {
        description: 'Document model instance',
        content: {'application/json': {schema: getModelSchemaRef(DocumentType)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Document.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DocumentType, {
            title: 'NewDocumentTypeInDocument',
            exclude: ['id'],
            optional: ['id']
          }),
        },
      },
    }) documentType: Omit<DocumentType, 'id'>,
  ): Promise<DocumentType> {
    return this.documentRepository.documentType(id).create(documentType);
  }

  @patch('/documents/{id}/document-type', {
    responses: {
      '200': {
        description: 'Document.DocumentType PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DocumentType, {partial: true}),
        },
      },
    })
    documentType: Partial<DocumentType>,
    @param.query.object('where', getWhereSchemaFor(DocumentType)) where?: Where<DocumentType>,
  ): Promise<Count> {
    return this.documentRepository.documentType(id).patch(documentType, where);
  }

  @del('/documents/{id}/document-type', {
    responses: {
      '200': {
        description: 'Document.DocumentType DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(DocumentType)) where?: Where<DocumentType>,
  ): Promise<Count> {
    return this.documentRepository.documentType(id).delete(where);
  }
}
