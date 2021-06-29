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
  Information,
  InformationTopic,
} from '../models';
import {InformationRepository} from '../repositories';

export class InformationInformationTopicController {
  constructor(
    @repository(InformationRepository) protected informationRepository: InformationRepository,
  ) { }

  @get('/information/{id}/information-topics', {
    responses: {
      '200': {
        description: 'Array of Information has many InformationTopic',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(InformationTopic)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<InformationTopic>,
  ): Promise<InformationTopic[]> {
    return this.informationRepository.informationTopics(id).find(filter);
  }

  @post('/information/{id}/information-topics', {
    responses: {
      '200': {
        description: 'Information model instance',
        content: {'application/json': {schema: getModelSchemaRef(InformationTopic)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Information.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InformationTopic, {
            title: 'NewInformationTopicInInformation',
 //           exclude: ['idInformation'],
            optional: ['idInformation']
          }),
        },
      },
    }) informationTopic: InformationTopic,
 // }) informationTopic: Omit<InformationTopic, 'idInformation'>,
  ): Promise<InformationTopic> {
    return this.informationRepository.informationTopics(id).create(informationTopic);
  }

  @patch('/information/{id}/information-topics', {
    responses: {
      '200': {
        description: 'Information.InformationTopic PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InformationTopic, {partial: true}),
        },
      },
    })
    informationTopic: Partial<InformationTopic>,
    @param.query.object('where', getWhereSchemaFor(InformationTopic)) where?: Where<InformationTopic>,
  ): Promise<Count> {
    return this.informationRepository.informationTopics(id).patch(informationTopic, where);
  }

  @del('/information/{id}/information-topics', {
    responses: {
      '200': {
        description: 'Information.InformationTopic DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(InformationTopic)) where?: Where<InformationTopic>,
  ): Promise<Count> {
    return this.informationRepository.informationTopics(id).delete(where);
  }
}
