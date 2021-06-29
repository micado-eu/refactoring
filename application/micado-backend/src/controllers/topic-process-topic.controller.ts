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
  Topic,
  ProcessTopic,
} from '../models';
import {TopicRepository} from '../repositories';

export class TopicProcessTopicController {
  constructor(
    @repository(TopicRepository) protected topicRepository: TopicRepository,
  ) { }

  @get('/topics/{id}/process-topics', {
    responses: {
      '200': {
        description: 'Array of Topic has many ProcessTopic',
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
    return this.topicRepository.linkedProcess(id).find(filter);
  }

  @post('/topics/{id}/process-topics', {
    responses: {
      '200': {
        description: 'Topic model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProcessTopic)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Topic.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProcessTopic, {
            title: 'NewProcessTopicInTopic',
            exclude: ['idProcess'],
            optional: ['idTopic']
          }),
        },
      },
    }) processTopic: Omit<ProcessTopic, 'idProcess'>,
  ): Promise<ProcessTopic> {
    return this.topicRepository.linkedProcess(id).create(processTopic);
  }

  @patch('/topics/{id}/process-topics', {
    responses: {
      '200': {
        description: 'Topic.ProcessTopic PATCH success count',
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
    return this.topicRepository.linkedProcess(id).patch(processTopic, where);
  }

  @del('/topics/{id}/process-topics', {
    responses: {
      '200': {
        description: 'Topic.ProcessTopic DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ProcessTopic)) where?: Where<ProcessTopic>,
  ): Promise<Count> {
    return this.topicRepository.linkedProcess(id).delete(where);
  }
}
