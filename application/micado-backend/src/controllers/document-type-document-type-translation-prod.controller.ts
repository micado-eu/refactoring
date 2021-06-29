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
  DocumentTypeTranslationProd,
} from '../models';
import {DocumentTypeRepository} from '../repositories';

export class DocumentTypeDocumentTypeTranslationProdController {
  constructor(
    @repository(DocumentTypeRepository) protected documentTypeRepository: DocumentTypeRepository,
  ) { }

  @get('/document-types/{id}/document-type-translation-prods', {
    responses: {
      '200': {
        description: 'Array of DocumentType has many DocumentTypeTranslationProd',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(DocumentTypeTranslationProd)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<DocumentTypeTranslationProd>,
  ): Promise<DocumentTypeTranslationProd[]> {
    return this.documentTypeRepository.translations_prod(id).find(filter);
  }

  @post('/document-types/{id}/document-type-translation-prods', {
    responses: {
      '200': {
        description: 'DocumentType model instance',
        content: {'application/json': {schema: getModelSchemaRef(DocumentTypeTranslationProd)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof DocumentType.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DocumentTypeTranslationProd, {
            title: 'NewDocumentTypeTranslationProdInDocumentType',
            //exclude: ['id'],
            optional: ['id']
          }),
        },
      },
    }) documentTypeTranslationProd: Omit<DocumentTypeTranslationProd, 'id'>,
  ): Promise<DocumentTypeTranslationProd> {
    return this.documentTypeRepository.translations_prod(id).create(documentTypeTranslationProd);
  }

  @patch('/document-types/{id}/document-type-translation-prods', {
    responses: {
      '200': {
        description: 'DocumentType.DocumentTypeTranslationProd PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DocumentTypeTranslationProd, {partial: true}),
        },
      },
    })
    documentTypeTranslationProd: Partial<DocumentTypeTranslationProd>,
    @param.query.object('where', getWhereSchemaFor(DocumentTypeTranslationProd)) where?: Where<DocumentTypeTranslationProd>,
  ): Promise<Count> {
    return this.documentTypeRepository.translations_prod(id).patch(documentTypeTranslationProd, where);
  }

  @del('/document-types/{id}/document-type-translation-prods', {
    responses: {
      '200': {
        description: 'DocumentType.DocumentTypeTranslationProd DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(DocumentTypeTranslationProd)) where?: Where<DocumentTypeTranslationProd>,
  ): Promise<Count> {
    return this.documentTypeRepository.translations_prod(id).delete(where);
  }
}
