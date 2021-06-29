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
  TopicTranslationProd,
} from '../models';
import {TopicRepository} from '../repositories';

export class TopicTopicTranslationProdController {
  constructor(
    @repository(TopicRepository) protected topicRepository: TopicRepository,
  ) { }

  @get('/topics/{id}/topic-translation-prods', {
    responses: {
      '200': {
        description: 'Array of Topic has many TopicTranslationProd',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TopicTranslationProd)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<TopicTranslationProd>,
  ): Promise<TopicTranslationProd[]> {
    return this.topicRepository.translations_prod(id).find(filter);
  }

  @post('/topics/{id}/topic-translation-prods', {
    responses: {
      '200': {
        description: 'Topic model instance',
        content: {'application/json': {schema: getModelSchemaRef(TopicTranslationProd)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Topic.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TopicTranslationProd, {
            title: 'NewTopicTranslationProdInTopic',
            //exclude: ['id'],
            optional: ['id']
          }),
        },
      },
    }) topicTranslationProd: Omit<TopicTranslationProd, 'id'>,
  ): Promise<TopicTranslationProd> {
    return this.topicRepository.translations_prod(id).create(topicTranslationProd);
  }

  @patch('/topics/{id}/topic-translation-prods', {
    responses: {
      '200': {
        description: 'Topic.TopicTranslationProd PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TopicTranslationProd, {partial: true}),
        },
      },
    })
    topicTranslationProd: Partial<TopicTranslationProd>,
    @param.query.object('where', getWhereSchemaFor(TopicTranslationProd)) where?: Where<TopicTranslationProd>,
  ): Promise<Count> {
    return this.topicRepository.translations_prod(id).patch(topicTranslationProd, where);
  }

  @del('/topics/{id}/topic-translation-prods', {
    responses: {
      '200': {
        description: 'Topic.TopicTranslationProd DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(TopicTranslationProd)) where?: Where<TopicTranslationProd>,
  ): Promise<Count> {
    return this.topicRepository.translations_prod(id).delete(where);
  }
}
