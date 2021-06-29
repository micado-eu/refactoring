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
  Process,
  ProcessTopic,
} from '../models';
import {ProcessRepository} from '../repositories';

export class ProcessProcessTopicController {
  constructor(
    @repository(ProcessRepository) protected processRepository: ProcessRepository,
  ) { }

  @get('/processes/{id}/process-topics', {
    responses: {
      '200': {
        description: 'Array of Process has many ProcessTopic',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ProcessTopic)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ProcessTopic>,
  ): Promise<ProcessTopic[]> {
    return this.processRepository.processTopics(id).find(filter);
  }

  @post('/processes/{id}/process-topics', {
    responses: {
      '200': {
        description: 'Process model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProcessTopic)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Process.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProcessTopic, {
            title: 'NewProcessTopicInProcess',
 //           exclude: ['idProcess'],
            optional: ['idProcess']
          }),
        },
      },
    }) processTopic: ProcessTopic,
 // }) processTopic: Omit<ProcessTopic, 'idProcess'>,
  ): Promise<ProcessTopic> {
    return this.processRepository.processTopics(id).create(processTopic);
  }

  @patch('/processes/{id}/process-topics', {
    responses: {
      '200': {
        description: 'Process.ProcessTopic PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProcessTopic, {partial: true}),
        },
      },
    })
    processTopic: Partial<ProcessTopic>,
    @param.query.object('where', getWhereSchemaFor(ProcessTopic)) where?: Where<ProcessTopic>,
  ): Promise<Count> {
    return this.processRepository.processTopics(id).patch(processTopic, where);
  }

  @del('/processes/{id}/process-topics', {
    responses: {
      '200': {
        description: 'Process.ProcessTopic DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ProcessTopic)) where?: Where<ProcessTopic>,
  ): Promise<Count> {
    return this.processRepository.processTopics(id).delete(where);
  }
}
