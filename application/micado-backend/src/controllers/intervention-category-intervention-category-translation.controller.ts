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
  InterventionCategory,
  InterventionCategoryTranslation,
} from '../models';
import { InterventionCategoryRepository } from '../repositories';

export class InterventionCategoryInterventionCategoryTranslationController {
  constructor(
    @repository(InterventionCategoryRepository) protected interventionCategoryRepository: InterventionCategoryRepository,
  ) { }

  @get('/intervention-categories/{id}/intervention-category-translations', {
    responses: {
      '200': {
        description: 'Array of InterventionCategory has many InterventionCategoryTranslation',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(InterventionCategoryTranslation) },
          },
        },
      },
    },
  })
  async find (
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<InterventionCategoryTranslation>,
  ): Promise<InterventionCategoryTranslation[]> {
    return this.interventionCategoryRepository.translations(id).find(filter);
  }

  @post('/intervention-categories/{id}/intervention-category-translations', {
    responses: {
      '200': {
        description: 'InterventionCategory model instance',
        content: { 'application/json': { schema: getModelSchemaRef(InterventionCategoryTranslation) } },
      },
    },
  })
  async create (
    @param.path.number('id') id: typeof InterventionCategory.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InterventionCategoryTranslation, {
            title: 'NewInterventionCategoryTranslationInInterventionCategory',
            //            exclude: ['id'],
            optional: ['id']
          }),
        },
      },
    }) interventionCategoryTranslation: InterventionCategoryTranslation,
    //    }) interventionCategoryTranslation: Omit < InterventionCategoryTranslation, 'id' >,
  ): Promise<InterventionCategoryTranslation> {
    return this.interventionCategoryRepository.translations(id).create(interventionCategoryTranslation);
  }

  @patch('/intervention-categories/{id}/intervention-category-translations', {
    responses: {
      '200': {
        description: 'InterventionCategory.InterventionCategoryTranslation PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async patch (
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InterventionCategoryTranslation, { partial: true }),
        },
      },
    })
    interventionCategoryTranslation: Partial<InterventionCategoryTranslation>,
    @param.query.object('where', getWhereSchemaFor(InterventionCategoryTranslation)) where?: Where<InterventionCategoryTranslation>,
  ): Promise<Count> {
    return this.interventionCategoryRepository.translations(id).patch(interventionCategoryTranslation, where);
  }

  @del('/intervention-categories/{id}/intervention-category-translations', {
    responses: {
      '200': {
        description: 'InterventionCategory.InterventionCategoryTranslation DELETE success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async delete (
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(InterventionCategoryTranslation)) where?: Where<InterventionCategoryTranslation>,
  ): Promise<Count> {
    return this.interventionCategoryRepository.translations(id).delete(where);
  }
}
