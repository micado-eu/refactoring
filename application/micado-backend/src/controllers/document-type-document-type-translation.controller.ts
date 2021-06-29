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
  DocumentTypeTranslation,
} from '../models';
import { DocumentTypeRepository } from '../repositories';

export class DocumentTypeDocumentTypeTranslationController {
  constructor(
    @repository(DocumentTypeRepository) protected documentTypeRepository: DocumentTypeRepository,
  ) { }

  @get('/document-types/{id}/document-type-translations', {
    responses: {
      '200': {
        description: 'Array of DocumentType has many DocumentTypeTranslation',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(DocumentTypeTranslation) },
          },
        },
      },
    },
  })
  async find (
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<DocumentTypeTranslation>,
  ): Promise<DocumentTypeTranslation[]> {
    return this.documentTypeRepository.translations(id).find(filter);
  }

  @post('/document-types/{id}/document-type-translations', {
    responses: {
      '200': {
        description: 'DocumentType model instance',
        content: { 'application/json': { schema: getModelSchemaRef(DocumentTypeTranslation) } },
      },
    },
  })
  async create (
    @param.path.number('id') id: typeof DocumentType.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DocumentTypeTranslation, {
            title: 'NewDocumentTypeTranslationInDocumentType',
            //            exclude: ['id'],
            optional: ['id']
          }),
        },
      },
    }) documentTypeTranslation: DocumentTypeTranslation,
    //   }) documentTypeTranslation: Omit < DocumentTypeTranslation, 'id' >,
  ): Promise<DocumentTypeTranslation> {
    return this.documentTypeRepository.translations(id).create(documentTypeTranslation);
  }

  @patch('/document-types/{id}/document-type-translations', {
    responses: {
      '200': {
        description: 'DocumentType.DocumentTypeTranslation PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async patch (
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DocumentTypeTranslation, { partial: true }),
        },
      },
    })
    documentTypeTranslation: Partial<DocumentTypeTranslation>,
    @param.query.object('where', getWhereSchemaFor(DocumentTypeTranslation)) where?: Where<DocumentTypeTranslation>,
  ): Promise<Count> {
    return this.documentTypeRepository.translations(id).patch(documentTypeTranslation, where);
  }

  @del('/document-types/{id}/document-type-translations', {
    responses: {
      '200': {
        description: 'DocumentType.DocumentTypeTranslation DELETE success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async delete (
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(DocumentTypeTranslation)) where?: Where<DocumentTypeTranslation>,
  ): Promise<Count> {
    return this.documentTypeRepository.translations(id).delete(where);
  }
}
