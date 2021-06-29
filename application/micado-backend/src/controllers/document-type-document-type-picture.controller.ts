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
  DocumentTypePicture,
} from '../models';
import {DocumentTypeRepository} from '../repositories';

export class DocumentTypeDocumentTypePictureController {
  constructor(
    @repository(DocumentTypeRepository) protected documentTypeRepository: DocumentTypeRepository,
  ) { }

  @get('/document-types/{id}/document-type-pictures', {
    responses: {
      '200': {
        description: 'Array of DocumentType has many DocumentTypePicture',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(DocumentTypePicture)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<DocumentTypePicture>,
  ): Promise<DocumentTypePicture[]> {
    return this.documentTypeRepository.pictures(id).find(filter);
  }

  @post('/document-types/{id}/document-type-pictures', {
    responses: {
      '200': {
        description: 'DocumentType model instance',
        content: {'application/json': {schema: getModelSchemaRef(DocumentTypePicture)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof DocumentType.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DocumentTypePicture, {
            title: 'NewDocumentTypePictureInDocumentType',
            exclude: ['id'],
            optional: ['documentTypeId']
          }),
        },
      },
    }) documentTypePicture: Omit<DocumentTypePicture, 'id'>,
  ): Promise<DocumentTypePicture> {
    return this.documentTypeRepository.pictures(id).create(documentTypePicture);
  }

  @patch('/document-types/{id}/document-type-pictures', {
    responses: {
      '200': {
        description: 'DocumentType.DocumentTypePicture PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DocumentTypePicture, {partial: true}),
        },
      },
    })
    documentTypePicture: Partial<DocumentTypePicture>,
    @param.query.object('where', getWhereSchemaFor(DocumentTypePicture)) where?: Where<DocumentTypePicture>,
  ): Promise<Count> {
    return this.documentTypeRepository.pictures(id).patch(documentTypePicture, where);
  }

  @del('/document-types/{id}/document-type-pictures', {
    responses: {
      '200': {
        description: 'DocumentType.DocumentTypePicture DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(DocumentTypePicture)) where?: Where<DocumentTypePicture>,
  ): Promise<Count> {
    return this.documentTypeRepository.pictures(id).delete(where);
  }
}
