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
  InterventionTypes,
  InterventionTypesTranslation,
} from '../models';
import { InterventionTypesRepository } from '../repositories';

export class InterventionTypesInterventionTypesTranslationController {
  constructor(
    @repository(InterventionTypesRepository) protected interventionTypesRepository: InterventionTypesRepository,
  ) { }

  @get('/intervention-types/{id}/intervention-types-translations', {
    responses: {
      '200': {
        description: 'Array of InterventionTypes has many InterventionTypesTranslation',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(InterventionTypesTranslation) },
          },
        },
      },
    },
  })
  async find (
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<InterventionTypesTranslation>,
  ): Promise<InterventionTypesTranslation[]> {
    return this.interventionTypesRepository.translations(id).find(filter);
  }

  @post('/intervention-types/{id}/intervention-types-translations', {
    responses: {
      '200': {
        description: 'InterventionTypes model instance',
        content: { 'application/json': { schema: getModelSchemaRef(InterventionTypesTranslation) } },
      },
    },
  })
  async create (
    @param.path.number('id') id: typeof InterventionTypes.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InterventionTypesTranslation, {
            title: 'NewInterventionTypesTranslationInInterventionTypes',
            //           exclude: ['id'],
            optional: ['id']
          }),
        },
      },
    }) interventionTypesTranslation: InterventionTypesTranslation,
    //   }) interventionTypesTranslation: Omit < InterventionTypesTranslation, 'id' >,
  ): Promise<InterventionTypesTranslation> {
    return this.interventionTypesRepository.translations(id).create(interventionTypesTranslation);
  }

  @patch('/intervention-types/{id}/intervention-types-translations', {
    responses: {
      '200': {
        description: 'InterventionTypes.InterventionTypesTranslation PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async patch (
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InterventionTypesTranslation, { partial: true }),
        },
      },
    })
    interventionTypesTranslation: Partial<InterventionTypesTranslation>,
    @param.query.object('where', getWhereSchemaFor(InterventionTypesTranslation)) where?: Where<InterventionTypesTranslation>,
  ): Promise<Count> {
    return this.interventionTypesRepository.translations(id).patch(interventionTypesTranslation, where);
  }

  @del('/intervention-types/{id}/intervention-types-translations', {
    responses: {
      '200': {
        description: 'InterventionTypes.InterventionTypesTranslation DELETE success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async delete (
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(InterventionTypesTranslation)) where?: Where<InterventionTypesTranslation>,
  ): Promise<Count> {
    return this.interventionTypesRepository.translations(id).delete(where);
  }
}
