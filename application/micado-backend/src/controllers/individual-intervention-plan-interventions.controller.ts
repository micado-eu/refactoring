import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {IndividualInterventionPlanInterventions} from '../models';
import {IndividualInterventionPlanInterventionsRepository} from '../repositories';

export class IndividualInterventionPlanInterventionsController {
  constructor(
    @repository(IndividualInterventionPlanInterventionsRepository)
    public individualInterventionPlanInterventionsRepository : IndividualInterventionPlanInterventionsRepository,
  ) {}

  @post('/individual-intervention-plan-interventions', {
    responses: {
      '200': {
        description: 'IndividualInterventionPlanInterventions model instance',
        content: {'application/json': {schema: getModelSchemaRef(IndividualInterventionPlanInterventions)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(IndividualInterventionPlanInterventions, {
            title: 'NewIndividualInterventionPlanInterventions',
            exclude: ['id'],
          }),
        },
      },
    })
    individualInterventionPlanInterventions: Omit<IndividualInterventionPlanInterventions, 'id'>,
  ): Promise<IndividualInterventionPlanInterventions> {
    return this.individualInterventionPlanInterventionsRepository.create(individualInterventionPlanInterventions);
  }

  @get('/individual-intervention-plan-interventions/count', {
    responses: {
      '200': {
        description: 'IndividualInterventionPlanInterventions model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(IndividualInterventionPlanInterventions) where?: Where<IndividualInterventionPlanInterventions>,
  ): Promise<Count> {
    return this.individualInterventionPlanInterventionsRepository.count(where);
  }

  @get('/individual-intervention-plan-interventions', {
    responses: {
      '200': {
        description: 'Array of IndividualInterventionPlanInterventions model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(IndividualInterventionPlanInterventions, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(IndividualInterventionPlanInterventions) filter?: Filter<IndividualInterventionPlanInterventions>,
  ): Promise<IndividualInterventionPlanInterventions[]> {
    return this.individualInterventionPlanInterventionsRepository.find(filter);
  }

  @patch('/individual-intervention-plan-interventions', {
    responses: {
      '200': {
        description: 'IndividualInterventionPlanInterventions PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(IndividualInterventionPlanInterventions, {partial: true}),
        },
      },
    })
    individualInterventionPlanInterventions: IndividualInterventionPlanInterventions,
    @param.where(IndividualInterventionPlanInterventions) where?: Where<IndividualInterventionPlanInterventions>,
  ): Promise<Count> {
    return this.individualInterventionPlanInterventionsRepository.updateAll(individualInterventionPlanInterventions, where);
  }

  @get('/individual-intervention-plan-interventions/{id}', {
    responses: {
      '200': {
        description: 'IndividualInterventionPlanInterventions model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(IndividualInterventionPlanInterventions, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(IndividualInterventionPlanInterventions, {exclude: 'where'}) filter?: FilterExcludingWhere<IndividualInterventionPlanInterventions>
  ): Promise<IndividualInterventionPlanInterventions> {
    return this.individualInterventionPlanInterventionsRepository.findById(id, filter);
  }

  @patch('/individual-intervention-plan-interventions/{id}', {
    responses: {
      '204': {
        description: 'IndividualInterventionPlanInterventions PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(IndividualInterventionPlanInterventions, {partial: true}),
        },
      },
    })
    individualInterventionPlanInterventions: IndividualInterventionPlanInterventions,
  ): Promise<void> {
    await this.individualInterventionPlanInterventionsRepository.updateById(id, individualInterventionPlanInterventions);
  }

  @put('/individual-intervention-plan-interventions/{id}', {
    responses: {
      '204': {
        description: 'IndividualInterventionPlanInterventions PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() individualInterventionPlanInterventions: IndividualInterventionPlanInterventions,
  ): Promise<void> {
    await this.individualInterventionPlanInterventionsRepository.replaceById(id, individualInterventionPlanInterventions);
  }

  @del('/individual-intervention-plan-interventions/{id}', {
    responses: {
      '204': {
        description: 'IndividualInterventionPlanInterventions DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.individualInterventionPlanInterventionsRepository.deleteById(id);
  }
}
