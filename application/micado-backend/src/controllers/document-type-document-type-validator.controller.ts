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
  DocumentTypeValidator,
} from '../models';
import {DocumentTypeRepository} from '../repositories';

export class DocumentTypeDocumentTypeValidatorController {
  constructor(
    @repository(DocumentTypeRepository) protected documentTypeRepository: DocumentTypeRepository,
  ) { }

  @get('/document-types/{id}/document-type-validators', {
    responses: {
      '200': {
        description: 'Array of DocumentType has many DocumentTypeValidator',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(DocumentTypeValidator)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<DocumentTypeValidator>,
  ): Promise<DocumentTypeValidator[]> {
    return this.documentTypeRepository.validators(id).find(filter);
  }

  @post('/document-types/{id}/document-type-validators', {
    responses: {
      '200': {
        description: 'DocumentType model instance',
        content: {'application/json': {schema: getModelSchemaRef(DocumentTypeValidator)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof DocumentType.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DocumentTypeValidator, {
            title: 'NewDocumentTypeValidatorInDocumentType',
            exclude: ['documentTypeId'],
            optional: ['documentTypeId']
          }),
        },
      },
    }) documentTypeValidator: Omit<DocumentTypeValidator, 'documentTypeId'>,
  ): Promise<DocumentTypeValidator> {
    return this.documentTypeRepository.validators(id).create(documentTypeValidator);
  }

  @patch('/document-types/{id}/document-type-validators', {
    responses: {
      '200': {
        description: 'DocumentType.DocumentTypeValidator PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DocumentTypeValidator, {partial: true}),
        },
      },
    })
    documentTypeValidator: Partial<DocumentTypeValidator>,
    @param.query.object('where', getWhereSchemaFor(DocumentTypeValidator)) where?: Where<DocumentTypeValidator>,
  ): Promise<Count> {
    return this.documentTypeRepository.validators(id).patch(documentTypeValidator, where);
  }

  @del('/document-types/{id}/document-type-validators', {
    responses: {
      '200': {
        description: 'DocumentType.DocumentTypeValidator DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(DocumentTypeValidator)) where?: Where<DocumentTypeValidator>,
  ): Promise<Count> {
    return this.documentTypeRepository.validators(id).delete(where);
  }
}
