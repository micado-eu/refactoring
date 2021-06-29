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
  Step,
  MixedIcons,
} from '../models';
import {StepRepository} from '../repositories';

export class StepMixedIconsController {
  constructor(
    @repository(StepRepository) protected stepRepository: StepRepository,
  ) { }

  @get('/steps/{id}/mixed-icons', {
    responses: {
      '200': {
        description: 'Step has one MixedIcons',
        content: {
          'application/json': {
            schema: getModelSchemaRef(MixedIcons),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<MixedIcons>,
  ): Promise<MixedIcons> {
    return this.stepRepository.icon(id).get(filter);
  }

  @post('/steps/{id}/mixed-icons', {
    responses: {
      '200': {
        description: 'Step model instance',
        content: {'application/json': {schema: getModelSchemaRef(MixedIcons)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Step.prototype.stepIcon,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MixedIcons, {
            title: 'NewMixedIconsInStep',
            exclude: ['id'],
            optional: ['id']
          }),
        },
      },
    }) mixedIcons: Omit<MixedIcons, 'id'>,
  ): Promise<MixedIcons> {
    return this.stepRepository.icon(id).create(mixedIcons);
  }

  @patch('/steps/{id}/mixed-icons', {
    responses: {
      '200': {
        description: 'Step.MixedIcons PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MixedIcons, {partial: true}),
        },
      },
    })
    mixedIcons: Partial<MixedIcons>,
    @param.query.object('where', getWhereSchemaFor(MixedIcons)) where?: Where<MixedIcons>,
  ): Promise<Count> {
    return this.stepRepository.icon(id).patch(mixedIcons, where);
  }

  @del('/steps/{id}/mixed-icons', {
    responses: {
      '200': {
        description: 'Step.MixedIcons DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(MixedIcons)) where?: Where<MixedIcons>,
  ): Promise<Count> {
    return this.stepRepository.icon(id).delete(where);
  }
}
