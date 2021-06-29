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
import {CompletedInterventionDocument} from '../models';
import {CompletedInterventionDocumentRepository} from '../repositories';

export class CompletedInterventionDocumentController {
  constructor(
    @repository(CompletedInterventionDocumentRepository)
    public completedInterventionDocumentRepository : CompletedInterventionDocumentRepository,
  ) {}

  @post('/completed-intervention-documents', {
    responses: {
      '200': {
        description: 'CompletedInterventionDocument model instance',
        content: {'application/json': {schema: getModelSchemaRef(CompletedInterventionDocument)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CompletedInterventionDocument, {
            title: 'NewCompletedInterventionDocument',
            
          }),
        },
      },
    })
    completedInterventionDocument: CompletedInterventionDocument,
  ): Promise<CompletedInterventionDocument> {
    return this.completedInterventionDocumentRepository.create(completedInterventionDocument);
  }

  @get('/completed-intervention-documents/count', {
    responses: {
      '200': {
        description: 'CompletedInterventionDocument model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(CompletedInterventionDocument) where?: Where<CompletedInterventionDocument>,
  ): Promise<Count> {
    return this.completedInterventionDocumentRepository.count(where);
  }

  @get('/completed-intervention-documents', {
    responses: {
      '200': {
        description: 'Array of CompletedInterventionDocument model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(CompletedInterventionDocument, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(CompletedInterventionDocument) filter?: Filter<CompletedInterventionDocument>,
  ): Promise<CompletedInterventionDocument[]> {
    return this.completedInterventionDocumentRepository.find(filter);
  }

  @patch('/completed-intervention-documents', {
    responses: {
      '200': {
        description: 'CompletedInterventionDocument PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CompletedInterventionDocument, {partial: true}),
        },
      },
    })
    completedInterventionDocument: CompletedInterventionDocument,
    @param.where(CompletedInterventionDocument) where?: Where<CompletedInterventionDocument>,
  ): Promise<Count> {
    return this.completedInterventionDocumentRepository.updateAll(completedInterventionDocument, where);
  }

  @get('/completed-intervention-documents/{id}', {
    responses: {
      '200': {
        description: 'CompletedInterventionDocument model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(CompletedInterventionDocument, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(CompletedInterventionDocument, {exclude: 'where'}) filter?: FilterExcludingWhere<CompletedInterventionDocument>
  ): Promise<CompletedInterventionDocument> {
    return this.completedInterventionDocumentRepository.findById(id, filter);
  }

  @patch('/completed-intervention-documents/{id}', {
    responses: {
      '204': {
        description: 'CompletedInterventionDocument PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CompletedInterventionDocument, {partial: true}),
        },
      },
    })
    completedInterventionDocument: CompletedInterventionDocument,
  ): Promise<void> {
    await this.completedInterventionDocumentRepository.updateById(id, completedInterventionDocument);
  }

  @put('/completed-intervention-documents/{id}', {
    responses: {
      '204': {
        description: 'CompletedInterventionDocument PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() completedInterventionDocument: CompletedInterventionDocument,
  ): Promise<void> {
    await this.completedInterventionDocumentRepository.replaceById(id, completedInterventionDocument);
  }

  @del('/completed-intervention-documents/{id}', {
    responses: {
      '204': {
        description: 'CompletedInterventionDocument DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.completedInterventionDocumentRepository.deleteById(id);
  }
}
