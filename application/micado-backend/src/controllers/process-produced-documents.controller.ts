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
import {ProcessProducedDocuments} from '../models';
import {ProcessProducedDocumentsRepository} from '../repositories';

export class ProcessProducedDocumentsController {
  constructor(
    @repository(ProcessProducedDocumentsRepository)
    public processProducedDocumentsRepository : ProcessProducedDocumentsRepository,
  ) {}

  @post('/process-produced-documents', {
    responses: {
      '200': {
        description: 'ProcessProducedDocuments model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProcessProducedDocuments)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProcessProducedDocuments, {
            title: 'NewProcessProducedDocuments',
            
          }),
        },
      },
    })
    processProducedDocuments: ProcessProducedDocuments,
  ): Promise<ProcessProducedDocuments> {
    return this.processProducedDocumentsRepository.create(processProducedDocuments);
  }

  @get('/process-produced-documents/count', {
    responses: {
      '200': {
        description: 'ProcessProducedDocuments model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(ProcessProducedDocuments) where?: Where<ProcessProducedDocuments>,
  ): Promise<Count> {
    return this.processProducedDocumentsRepository.count(where);
  }

  @get('/process-produced-documents', {
    responses: {
      '200': {
        description: 'Array of ProcessProducedDocuments model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(ProcessProducedDocuments, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(ProcessProducedDocuments) filter?: Filter<ProcessProducedDocuments>,
  ): Promise<ProcessProducedDocuments[]> {
    return this.processProducedDocumentsRepository.find(filter);
  }

  @patch('/process-produced-documents', {
    responses: {
      '200': {
        description: 'ProcessProducedDocuments PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProcessProducedDocuments, {partial: true}),
        },
      },
    })
    processProducedDocuments: ProcessProducedDocuments,
    @param.where(ProcessProducedDocuments) where?: Where<ProcessProducedDocuments>,
  ): Promise<Count> {
    return this.processProducedDocumentsRepository.updateAll(processProducedDocuments, where);
  }

  @get('/process-produced-documents/{id}', {
    responses: {
      '200': {
        description: 'ProcessProducedDocuments model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ProcessProducedDocuments, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ProcessProducedDocuments, {exclude: 'where'}) filter?: FilterExcludingWhere<ProcessProducedDocuments>
  ): Promise<ProcessProducedDocuments> {
    return this.processProducedDocumentsRepository.findById(id, filter);
  }

  @patch('/process-produced-documents/{id}', {
    responses: {
      '204': {
        description: 'ProcessProducedDocuments PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProcessProducedDocuments, {partial: true}),
        },
      },
    })
    processProducedDocuments: ProcessProducedDocuments,
  ): Promise<void> {
    await this.processProducedDocumentsRepository.updateById(id, processProducedDocuments);
  }

  @put('/process-produced-documents/{id}', {
    responses: {
      '204': {
        description: 'ProcessProducedDocuments PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() processProducedDocuments: ProcessProducedDocuments,
  ): Promise<void> {
    await this.processProducedDocumentsRepository.replaceById(id, processProducedDocuments);
  }

  @del('/process-produced-documents/{id}', {
    responses: {
      '204': {
        description: 'ProcessProducedDocuments DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.processProducedDocumentsRepository.deleteById(id);
  }
}
