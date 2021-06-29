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
  InterventionTypeValidator,
} from '../models';
import {InterventionTypesRepository} from '../repositories';

export class InterventionTypesInterventionTypeValidatorController {
  constructor(
    @repository(InterventionTypesRepository) protected interventionTypesRepository: InterventionTypesRepository,
  ) { }

  @get('/intervention-types/{id}/intervention-type-validators', {
    responses: {
      '200': {
        description: 'Array of InterventionTypes has many InterventionTypeValidator',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(InterventionTypeValidator)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<InterventionTypeValidator>,
  ): Promise<InterventionTypeValidator[]> {
    return this.interventionTypesRepository.interventionTypeValidators(id).find(filter);
  }

  @post('/intervention-types/{id}/intervention-type-validators', {
    responses: {
      '200': {
        description: 'InterventionTypes model instance',
        content: {'application/json': {schema: getModelSchemaRef(InterventionTypeValidator)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof InterventionTypes.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InterventionTypeValidator, {
            title: 'NewInterventionTypeValidatorInInterventionTypes',
            //exclude: ['tenantId'],
            optional: ['interventionTypeId']
          }),
        },
      },
    }) interventionTypeValidator: Omit<InterventionTypeValidator, 'tenantId'>,
  ): Promise<InterventionTypeValidator> {
    return this.interventionTypesRepository.interventionTypeValidators(id).create(interventionTypeValidator);
  }

  @patch('/intervention-types/{id}/intervention-type-validators', {
    responses: {
      '200': {
        description: 'InterventionTypes.InterventionTypeValidator PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InterventionTypeValidator, {partial: true}),
        },
      },
    })
    interventionTypeValidator: Partial<InterventionTypeValidator>,
    @param.query.object('where', getWhereSchemaFor(InterventionTypeValidator)) where?: Where<InterventionTypeValidator>,
  ): Promise<Count> {
    return this.interventionTypesRepository.interventionTypeValidators(id).patch(interventionTypeValidator, where);
  }

  @del('/intervention-types/{id}/intervention-type-validators', {
    responses: {
      '200': {
        description: 'InterventionTypes.InterventionTypeValidator DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(InterventionTypeValidator)) where?: Where<InterventionTypeValidator>,
  ): Promise<Count> {
    return this.interventionTypesRepository.interventionTypeValidators(id).delete(where);
  }
}
