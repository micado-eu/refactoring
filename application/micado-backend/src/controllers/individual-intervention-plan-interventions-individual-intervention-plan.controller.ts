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
  IndividualInterventionPlanInterventions,
  IndividualInterventionPlan,
} from '../models';
import {IndividualInterventionPlanInterventionsRepository} from '../repositories';

export class IndividualInterventionPlanInterventionsIndividualInterventionPlanController {
  constructor(
    @repository(IndividualInterventionPlanInterventionsRepository) protected individualInterventionPlanInterventionsRepository: IndividualInterventionPlanInterventionsRepository,
  ) { }

  @get('/individual-intervention-plan-interventions/{id}/individual-intervention-plan', {
    responses: {
      '200': {
        description: 'IndividualInterventionPlanInterventions has one IndividualInterventionPlan',
        content: {
          'application/json': {
            schema: getModelSchemaRef(IndividualInterventionPlan),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<IndividualInterventionPlan>,
  ): Promise<IndividualInterventionPlan> {
    return this.individualInterventionPlanInterventionsRepository.interventionPlan(id).get(filter);
  }

  @post('/individual-intervention-plan-interventions/{id}/individual-intervention-plan', {
    responses: {
      '200': {
        description: 'IndividualInterventionPlanInterventions model instance',
        content: {'application/json': {schema: getModelSchemaRef(IndividualInterventionPlan)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof IndividualInterventionPlanInterventions.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(IndividualInterventionPlan, {
            title: 'NewIndividualInterventionPlanInIndividualInterventionPlanInterventions',
            exclude: ['id'],
            optional: ['id']
          }),
        },
      },
    }) individualInterventionPlan: Omit<IndividualInterventionPlan, 'id'>,
  ): Promise<IndividualInterventionPlan> {
    return this.individualInterventionPlanInterventionsRepository.interventionPlan(id).create(individualInterventionPlan);
  }

  @patch('/individual-intervention-plan-interventions/{id}/individual-intervention-plan', {
    responses: {
      '200': {
        description: 'IndividualInterventionPlanInterventions.IndividualInterventionPlan PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(IndividualInterventionPlan, {partial: true}),
        },
      },
    })
    individualInterventionPlan: Partial<IndividualInterventionPlan>,
    @param.query.object('where', getWhereSchemaFor(IndividualInterventionPlan)) where?: Where<IndividualInterventionPlan>,
  ): Promise<Count> {
    return this.individualInterventionPlanInterventionsRepository.interventionPlan(id).patch(individualInterventionPlan, where);
  }

  @del('/individual-intervention-plan-interventions/{id}/individual-intervention-plan', {
    responses: {
      '200': {
        description: 'IndividualInterventionPlanInterventions.IndividualInterventionPlan DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(IndividualInterventionPlan)) where?: Where<IndividualInterventionPlan>,
  ): Promise<Count> {
    return this.individualInterventionPlanInterventionsRepository.interventionPlan(id).delete(where);
  }
}
