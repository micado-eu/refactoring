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
  IndividualInterventionPlan,
  IndividualInterventionPlanInterventions,
} from '../models';
import {IndividualInterventionPlanRepository} from '../repositories';

export class IndividualInterventionPlanIndividualInterventionPlanInterventionsController {
  constructor(
    @repository(IndividualInterventionPlanRepository) protected individualInterventionPlanRepository: IndividualInterventionPlanRepository,
  ) { }

  @get('/individual-intervention-plans/{id}/individual-intervention-plan-interventions', {
    responses: {
      '200': {
        description: 'Array of IndividualInterventionPlan has many IndividualInterventionPlanInterventions',
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
    return this.individualInterventionPlanRepository.interventions(id).find(filter);
  }

  @post('/individual-intervention-plans/{id}/individual-intervention-plan-interventions', {
    responses: {
      '200': {
        description: 'IndividualInterventionPlan model instance',
        content: {'application/json': {schema: getModelSchemaRef(IndividualInterventionPlanInterventions)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof IndividualInterventionPlan.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(IndividualInterventionPlanInterventions, {
            title: 'NewIndividualInterventionPlanInterventionsInIndividualInterventionPlan',
            exclude: ['id'],
            optional: ['listId']
          }),
        },
      },
    }) individualInterventionPlanInterventions: Omit<IndividualInterventionPlanInterventions, 'id'>,
  ): Promise<IndividualInterventionPlanInterventions> {
    return this.individualInterventionPlanRepository.interventions(id).create(individualInterventionPlanInterventions);
  }

  @patch('/individual-intervention-plans/{id}/individual-intervention-plan-interventions', {
    responses: {
      '200': {
        description: 'IndividualInterventionPlan.IndividualInterventionPlanInterventions PATCH success count',
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
    return this.individualInterventionPlanRepository.interventions(id).patch(individualInterventionPlanInterventions, where);
  }

  @del('/individual-intervention-plans/{id}/individual-intervention-plan-interventions', {
    responses: {
      '200': {
        description: 'IndividualInterventionPlan.IndividualInterventionPlanInterventions DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(IndividualInterventionPlanInterventions)) where?: Where<IndividualInterventionPlanInterventions>,
  ): Promise<Count> {
    return this.individualInterventionPlanRepository.interventions(id).delete(where);
  }
}
