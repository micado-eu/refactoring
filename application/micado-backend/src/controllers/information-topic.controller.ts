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
import {InformationTopic} from '../models';
import {InformationTopicRepository} from '../repositories';

export class InformationTopicController {
  constructor(
    @repository(InformationTopicRepository)
    public informationTopicRepository : InformationTopicRepository,
  ) {}

  @get('/information-topics/count', {
    responses: {
      '200': {
        description: 'InformationTopic model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(InformationTopic) where?: Where<InformationTopic>,
  ): Promise<Count> {
    return this.informationTopicRepository.count(where);
  }

  @get('/information-topics', {
    responses: {
      '200': {
        description: 'Array of InformationTopic model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(InformationTopic, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(InformationTopic) filter?: Filter<InformationTopic>,
  ): Promise<InformationTopic[]> {
    return this.informationTopicRepository.find(filter);
  }

}
