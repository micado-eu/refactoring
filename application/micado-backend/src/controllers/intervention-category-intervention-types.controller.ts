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
  InterventionTypes,
} from '../models';
import {InterventionCategoryRepository} from '../repositories';

export class InterventionCategoryInterventionTypesController {
  constructor(
    @repository(InterventionCategoryRepository) protected interventionCategoryRepository: InterventionCategoryRepository,
  ) { }

  @get('/intervention-categories/{id}/intervention-types', {
    responses: {
      '200': {
        description: 'Array of InterventionCategory has many InterventionTypes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(InterventionTypes)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<InterventionTypes>,
  ): Promise<InterventionTypes[]> {
    return this.interventionCategoryRepository.linkedInterventionType(id).find(filter);
  }

  @post('/intervention-categories/{id}/intervention-types', {
    responses: {
      '200': {
        description: 'InterventionCategory model instance',
        content: {'application/json': {schema: getModelSchemaRef(InterventionTypes)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof InterventionCategory.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InterventionTypes, {
            title: 'NewInterventionTypesInInterventionCategory',
            exclude: ['id'],
            optional: ['categoryType']
          }),
        },
      },
    }) interventionTypes: Omit<InterventionTypes, 'id'>,
  ): Promise<InterventionTypes> {
    return this.interventionCategoryRepository.linkedInterventionType(id).create(interventionTypes);
  }

  @patch('/intervention-categories/{id}/intervention-types', {
    responses: {
      '200': {
        description: 'InterventionCategory.InterventionTypes PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InterventionTypes, {partial: true}),
        },
      },
    })
    interventionTypes: Partial<InterventionTypes>,
    @param.query.object('where', getWhereSchemaFor(InterventionTypes)) where?: Where<InterventionTypes>,
  ): Promise<Count> {
    return this.interventionCategoryRepository.linkedInterventionType(id).patch(interventionTypes, where);
  }

  @del('/intervention-categories/{id}/intervention-types', {
    responses: {
      '200': {
        description: 'InterventionCategory.InterventionTypes DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(InterventionTypes)) where?: Where<InterventionTypes>,
  ): Promise<Count> {
    return this.interventionCategoryRepository.linkedInterventionType(id).delete(where);
  }
}
