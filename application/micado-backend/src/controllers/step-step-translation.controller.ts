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
  StepTranslation,
} from '../models';
import { StepRepository } from '../repositories';

export class StepStepTranslationController {
  constructor(
    @repository(StepRepository) protected stepRepository: StepRepository,
  ) { }

  @get('/steps/{id}/step-translations', {
    responses: {
      '200': {
        description: 'Array of Step has many StepTranslation',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(StepTranslation) },
          },
        },
      },
    },
  })
  async find (
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<StepTranslation>,
  ): Promise<StepTranslation[]> {
    return this.stepRepository.translations(id).find(filter);
  }

  @post('/steps/{id}/step-translations', {
    responses: {
      '200': {
        description: 'Step model instance',
        content: { 'application/json': { schema: getModelSchemaRef(StepTranslation) } },
      },
    },
  })
  async create (
    @param.path.string('id') id: typeof Step.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(StepTranslation, {
            title: 'NewStepTranslationInStep',
            //            exclude: ['id'],
            optional: ['id']
          }),
        },
      },
    }) stepTranslation: StepTranslation,
    //    }) stepTranslation: Omit < StepTranslation, 'id' >,
  ): Promise<StepTranslation> {
    return this.stepRepository.translations(id).create(stepTranslation);
  }

  @patch('/steps/{id}/step-translations', {
    responses: {
      '200': {
        description: 'Step.StepTranslation PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async patch (
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(StepTranslation, { partial: true }),
        },
      },
    })
    stepTranslation: Partial<StepTranslation>,
    @param.query.object('where', getWhereSchemaFor(StepTranslation)) where?: Where<StepTranslation>,
  ): Promise<Count> {
    return this.stepRepository.translations(id).patch(stepTranslation, where);
  }

  @del('/steps/{id}/step-translations', {
    responses: {
      '200': {
        description: 'Step.StepTranslation DELETE success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async delete (
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(StepTranslation)) where?: Where<StepTranslation>,
  ): Promise<Count> {
    return this.stepRepository.translations(id).delete(where);
  }
}
