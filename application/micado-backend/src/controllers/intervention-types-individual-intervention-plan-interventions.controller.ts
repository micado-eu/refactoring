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
  IndividualInterventionPlanInterventions,
} from '../models';
import {InterventionTypesRepository} from '../repositories';

export class InterventionTypesIndividualInterventionPlanInterventionsController {
  constructor(
    @repository(InterventionTypesRepository) protected interventionTypesRepository: InterventionTypesRepository,
  ) { }

  @get('/intervention-types/{id}/individual-intervention-plan-interventions', {
    responses: {
      '200': {
        description: 'Array of InterventionTypes has many IndividualInterventionPlanInterventions',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(IndividualInterventionPlanInterventions)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<IndividualInterventionPlanInterventions>,
  ): Promise<IndividualInterventionPlanInterventions[]> {
    return this.interventionTypesRepository.linkedInterventions(id).find(filter);
  }

  @post('/intervention-types/{id}/individual-intervention-plan-interventions', {
    responses: {
      '200': {
        description: 'InterventionTypes model instance',
        content: {'application/json': {schema: getModelSchemaRef(IndividualInterventionPlanInterventions)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof InterventionTypes.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(IndividualInterventionPlanInterventions, {
            title: 'NewIndividualInterventionPlanInterventionsInInterventionTypes',
            exclude: ['id'],
            optional: ['interventionType']
          }),
        },
      },
    }) individualInterventionPlanInterventions: Omit<IndividualInterventionPlanInterventions, 'id'>,
  ): Promise<IndividualInterventionPlanInterventions> {
    return this.interventionTypesRepository.linkedInterventions(id).create(individualInterventionPlanInterventions);
  }

  @patch('/intervention-types/{id}/individual-intervention-plan-interventions', {
    responses: {
      '200': {
        description: 'InterventionTypes.IndividualInterventionPlanInterventions PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(IndividualInterventionPlanInterventions, {partial: true}),
        },
      },
    })
    individualInterventionPlanInterventions: Partial<IndividualInterventionPlanInterventions>,
    @param.query.object('where', getWhereSchemaFor(IndividualInterventionPlanInterventions)) where?: Where<IndividualInterventionPlanInterventions>,
  ): Promise<Count> {
    return this.interventionTypesRepository.linkedInterventions(id).patch(individualInterventionPlanInterventions, where);
  }

  @del('/intervention-types/{id}/individual-intervention-plan-interventions', {
    responses: {
      '200': {
        description: 'InterventionTypes.IndividualInterventionPlanInterventions DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(IndividualInterventionPlanInterventions)) where?: Where<IndividualInterventionPlanInterventions>,
  ): Promise<Count> {
    return this.interventionTypesRepository.linkedInterventions(id).delete(where);
  }
}
