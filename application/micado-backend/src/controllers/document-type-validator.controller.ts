import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {DocumentTypeValidator} from '../models';
import {DocumentTypeValidatorRepository} from '../repositories';

export class DocumentTypeValidatorController {
  constructor(
    @repository(DocumentTypeValidatorRepository)
    public documentTypeValidatorRepository : DocumentTypeValidatorRepository,
  ) {}

  @post('/document-type-validators', {
    responses: {
      '200': {
        description: 'DocumentTypeValidator model instance',
        content: {'application/json': {schema: getModelSchemaRef(DocumentTypeValidator)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DocumentTypeValidator, {
            title: 'NewDocumentTypeValidator',
            
          }),
        },
      },
    })
    documentTypeValidator: DocumentTypeValidator,
  ): Promise<DocumentTypeValidator> {
    return this.documentTypeValidatorRepository.create(documentTypeValidator);
  }

  @get('/document-type-validators/count', {
    responses: {
      '200': {
        description: 'DocumentTypeValidator model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(DocumentTypeValidator) where?: Where<DocumentTypeValidator>,
  ): Promise<Count> {
    return this.documentTypeValidatorRepository.count(where);
  }

  @get('/document-type-validators', {
    responses: {
      '200': {
        description: 'Array of DocumentTypeValidator model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(DocumentTypeValidator, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(DocumentTypeValidator) filter?: Filter<DocumentTypeValidator>,
  ): Promise<DocumentTypeValidator[]> {
    return this.documentTypeValidatorRepository.find(filter);
  }

  @patch('/document-type-validators', {
    responses: {
      '200': {
        description: 'DocumentTypeValidator PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DocumentTypeValidator, {partial: true}),
        },
      },
    })
    documentTypeValidator: DocumentTypeValidator,
    @param.where(DocumentTypeValidator) where?: Where<DocumentTypeValidator>,
  ): Promise<Count> {
    return this.documentTypeValidatorRepository.updateAll(documentTypeValidator, where);
  }

  @get('/document-type-validators/{id}', {
    responses: {
      '200': {
        description: 'DocumentTypeValidator model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(DocumentTypeValidator, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(DocumentTypeValidator, {exclude: 'where'}) filter?: FilterExcludingWhere<DocumentTypeValidator>
  ): Promise<DocumentTypeValidator> {
    return this.documentTypeValidatorRepository.findById(id, filter);
  }

  @patch('/document-type-validators/{id}', {
    responses: {
      '204': {
        description: 'DocumentTypeValidator PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DocumentTypeValidator, {partial: true}),
        },
      },
    })
    documentTypeValidator: DocumentTypeValidator,
  ): Promise<void> {
    await this.documentTypeValidatorRepository.updateById(id, documentTypeValidator);
  }

  @put('/document-type-validators/{id}', {
    responses: {
      '204': {
        description: 'DocumentTypeValidator PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() documentTypeValidator: DocumentTypeValidator,
  ): Promise<void> {
    await this.documentTypeValidatorRepository.replaceById(id, documentTypeValidator);
  }

  @del('/document-type-validators/{id}', {
    responses: {
      '204': {
        description: 'DocumentTypeValidator DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.documentTypeValidatorRepository.deleteById(id);
  }
}
