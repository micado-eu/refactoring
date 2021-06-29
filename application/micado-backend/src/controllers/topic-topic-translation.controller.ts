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
  TopicTranslation,
} from '../models';
import {TopicRepository} from '../repositories';

export class TopicTopicTranslationController {
  constructor(
    @repository(TopicRepository) protected topicRepository: TopicRepository,
  ) { }

  @get('/topics/{id}/topic-translations', {
    responses: {
      '200': {
        description: 'Array of Topic has many TopicTranslation',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TopicTranslation)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<TopicTranslation>,
  ): Promise<TopicTranslation[]> {
    return this.topicRepository.translations(id).find(filter);
  }

  @post('/topics/{id}/topic-translations', {
    responses: {
      '200': {
        description: 'Topic model instance',
        content: {'application/json': {schema: getModelSchemaRef(TopicTranslation)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Topic.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TopicTranslation, {
            title: 'NewTopicTranslationInTopic',
//            exclude: ['id'],
            optional: ['id']
          }),
        },
      },
    }) topicTranslation: TopicTranslation,
//  }) topicTranslation: Omit<TopicTranslation, 'id'>,
  ): Promise<TopicTranslation> {
    return this.topicRepository.translations(id).create(topicTranslation);
  }

  @patch('/topics/{id}/topic-translations', {
    responses: {
      '200': {
        description: 'Topic.TopicTranslation PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TopicTranslation, {partial: true}),
        },
      },
    })
    topicTranslation: Partial<TopicTranslation>,
    @param.query.object('where', getWhereSchemaFor(TopicTranslation)) where?: Where<TopicTranslation>,
  ): Promise<Count> {
    return this.topicRepository.translations(id).patch(topicTranslation, where);
  }

  @del('/topics/{id}/topic-translations', {
    responses: {
      '200': {
        description: 'Topic.TopicTranslation DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(TopicTranslation)) where?: Where<TopicTranslation>,
  ): Promise<Count> {
    return this.topicRepository.translations(id).delete(where);
  }
}
