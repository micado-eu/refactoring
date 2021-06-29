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
import {ProcessTopic} from '../models';
import {ProcessTopicRepository} from '../repositories';

export class ProcessTopicController {
  constructor(
    @repository(ProcessTopicRepository)
    public processTopicRepository : ProcessTopicRepository,
  ) {}

  @post('/process-topics', {
    responses: {
      '200': {
        description: 'ProcessTopic model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProcessTopic)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProcessTopic, {
            title: 'NewProcessTopic',
            
          }),
        },
      },
    })
    processTopic: ProcessTopic,
  ): Promise<ProcessTopic> {
    return this.processTopicRepository.create(processTopic);
  }

  @get('/process-topics/count', {
    responses: {
      '200': {
        description: 'ProcessTopic model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(ProcessTopic) where?: Where<ProcessTopic>,
  ): Promise<Count> {
    return this.processTopicRepository.count(where);
  }

  @get('/process-topics', {
    responses: {
      '200': {
        description: 'Array of ProcessTopic model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(ProcessTopic, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(ProcessTopic) filter?: Filter<ProcessTopic>,
  ): Promise<ProcessTopic[]> {
    return this.processTopicRepository.find(filter);
  }

  @patch('/process-topics', {
    responses: {
      '200': {
        description: 'ProcessTopic PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProcessTopic, {partial: true}),
        },
      },
    })
    processTopic: ProcessTopic,
    @param.where(ProcessTopic) where?: Where<ProcessTopic>,
  ): Promise<Count> {
    return this.processTopicRepository.updateAll(processTopic, where);
  }

  @get('/process-topics/{id}', {
    responses: {
      '200': {
        description: 'ProcessTopic model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ProcessTopic, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ProcessTopic, {exclude: 'where'}) filter?: FilterExcludingWhere<ProcessTopic>
  ): Promise<ProcessTopic> {
    return this.processTopicRepository.findById(id, filter);
  }

  @patch('/process-topics/{id}', {
    responses: {
      '204': {
        description: 'ProcessTopic PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProcessTopic, {partial: true}),
        },
      },
    })
    processTopic: ProcessTopic,
  ): Promise<void> {
    await this.processTopicRepository.updateById(id, processTopic);
  }

  @put('/process-topics/{id}', {
    responses: {
      '204': {
        description: 'ProcessTopic PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() processTopic: ProcessTopic,
  ): Promise<void> {
    await this.processTopicRepository.replaceById(id, processTopic);
  }

  @del('/process-topics/{id}', {
    responses: {
      '204': {
        description: 'ProcessTopic DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.processTopicRepository.deleteById(id);
  }
}
