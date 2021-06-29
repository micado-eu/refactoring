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
  StepLink,
  StepLinkTranslation,
} from '../models';
import { StepLinkRepository } from '../repositories';

export class StepLinkStepLinkTranslationController {
  constructor(
    @repository(StepLinkRepository) protected stepLinkRepository: StepLinkRepository,
  ) { }

  @get('/step-links/{id}/step-link-translations', {
    responses: {
      '200': {
        description: 'Array of StepLink has many StepLinkTranslation',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(StepLinkTranslation) },
          },
        },
      },
    },
  })
  async find (
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<StepLinkTranslation>,
  ): Promise<StepLinkTranslation[]> {
    return this.stepLinkRepository.translations(id).find(filter);
  }

  @post('/step-links/{id}/step-link-translations', {
    responses: {
      '200': {
        description: 'StepLink model instance',
        content: { 'application/json': { schema: getModelSchemaRef(StepLinkTranslation) } },
      },
    },
  })
  async create (
    @param.path.string('id') id: typeof StepLink.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(StepLinkTranslation, {
            title: 'NewStepLinkTranslationInStepLink',
            //           exclude: ['id'],
            optional: ['id']
          }),
        },
      },
    }) stepLinkTranslation: StepLinkTranslation,
    //    }) stepLinkTranslation: Omit < StepLinkTranslation, 'id' >,
  ): Promise<StepLinkTranslation> {
    return this.stepLinkRepository.translations(id).create(stepLinkTranslation);
  }

  @patch('/step-links/{id}/step-link-translations', {
    responses: {
      '200': {
        description: 'StepLink.StepLinkTranslation PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async patch (
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(StepLinkTranslation, { partial: true }),
        },
      },
    })
    stepLinkTranslation: Partial<StepLinkTranslation>,
    @param.query.object('where', getWhereSchemaFor(StepLinkTranslation)) where?: Where<StepLinkTranslation>,
  ): Promise<Count> {
    return this.stepLinkRepository.translations(id).patch(stepLinkTranslation, where);
  }

  @del('/step-links/{id}/step-link-translations', {
    responses: {
      '200': {
        description: 'StepLink.StepLinkTranslation DELETE success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async delete (
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(StepLinkTranslation)) where?: Where<StepLinkTranslation>,
  ): Promise<Count> {
    return this.stepLinkRepository.translations(id).delete(where);
  }
}
