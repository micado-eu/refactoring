import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {EventTopic} from '../models';
import {EventTopicRepository} from '../repositories';

export class EventTopicController {
  constructor(
    @repository(EventTopicRepository)
    public eventTopicRepository : EventTopicRepository,
  ) {}

  @get('/event-topics/count', {
    responses: {
      '200': {
        description: 'EventTopic model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(EventTopic) where?: Where<EventTopic>,
  ): Promise<Count> {
    return this.eventTopicRepository.count(where);
  }

  @get('/event-topics', {
    responses: {
      '200': {
        description: 'Array of EventTopic model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(EventTopic, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(EventTopic) filter?: Filter<EventTopic>,
  ): Promise<EventTopic[]> {
    return this.eventTopicRepository.find(filter);
  }

}
