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
import { IndividualInterventionPlan } from '../models';
import { IndividualInterventionPlanRepository } from '../repositories';
import { InterventionTypesRepository } from '../repositories';

export class IndividualInterventionPlanController {
  constructor(
    @repository(IndividualInterventionPlanRepository)
    public individualInterventionPlanRepository: IndividualInterventionPlanRepository,
    @repository(InterventionTypesRepository) public interventionTypesRepository: InterventionTypesRepository
  ) { }

  @post('/individual-intervention-plans', {
    responses: {
      '200': {
        description: 'IndividualInterventionPlan model instance',
        content: { 'application/json': { schema: getModelSchemaRef(IndividualInterventionPlan) } },
      },
    },
  })
  async create (
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(IndividualInterventionPlan, {
            title: 'NewIndividualInterventionPlan',
            exclude: ['id'],
          }),
        },
      },
    })
    individualInterventionPlan: Omit<IndividualInterventionPlan, 'id'>,
  ): Promise<IndividualInterventionPlan> {
    return this.individualInterventionPlanRepository.create(individualInterventionPlan);
  }

  @get('/individual-intervention-plans/count', {
    responses: {
      '200': {
        description: 'IndividualInterventionPlan model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count (
    @param.where(IndividualInterventionPlan) where?: Where<IndividualInterventionPlan>,
  ): Promise<Count> {
    return this.individualInterventionPlanRepository.count(where);
  }

  @get('/individual-intervention-plans', {
    responses: {
      '200': {
        description: 'Array of IndividualInterventionPlan model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(IndividualInterventionPlan, { includeRelations: true }),
            },
          },
        },
      },
    },
  })
  async find (
    @param.filter(IndividualInterventionPlan) filter?: Filter<IndividualInterventionPlan>,
  ): Promise<IndividualInterventionPlan[]> {
    return this.individualInterventionPlanRepository.find(filter);
  }

  @patch('/individual-intervention-plans', {
    responses: {
      '200': {
        description: 'IndividualInterventionPlan PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll (
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(IndividualInterventionPlan, { partial: true }),
        },
      },
    })
    individualInterventionPlan: IndividualInterventionPlan,
    @param.where(IndividualInterventionPlan) where?: Where<IndividualInterventionPlan>,
  ): Promise<Count> {
    return this.individualInterventionPlanRepository.updateAll(individualInterventionPlan, where);
  }

  @get('/individual-intervention-plans/{id}', {
    responses: {
      '200': {
        description: 'IndividualInterventionPlan model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(IndividualInterventionPlan, { includeRelations: true }),
          },
        },
      },
    },
  })
  async findById (
    @param.path.number('id') id: number,
    @param.filter(IndividualInterventionPlan, { exclude: 'where' }) filter?: FilterExcludingWhere<IndividualInterventionPlan>
  ): Promise<IndividualInterventionPlan> {
    return this.individualInterventionPlanRepository.findById(id, filter);
  }

  @patch('/individual-intervention-plans/{id}', {
    responses: {
      '204': {
        description: 'IndividualInterventionPlan PATCH success',
      },
    },
  })
  async updateById (
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(IndividualInterventionPlan, { partial: true }),
        },
      },
    })
    individualInterventionPlan: IndividualInterventionPlan,
  ): Promise<void> {
    await this.individualInterventionPlanRepository.updateById(id, individualInterventionPlan);
  }

  @put('/individual-intervention-plans/{id}', {
    responses: {
      '204': {
        description: 'IndividualInterventionPlan PUT success',
      },
    },
  })
  async replaceById (
    @param.path.number('id') id: number,
    @requestBody() individualInterventionPlan: IndividualInterventionPlan,
  ): Promise<void> {
    await this.individualInterventionPlanRepository.replaceById(id, individualInterventionPlan);
  }

  @del('/individual-intervention-plans/{id}', {
    responses: {
      '204': {
        description: 'IndividualInterventionPlan DELETE success',
      },
    },
  })
  async deleteById (@param.path.number('id') id: number): Promise<void> {
    await this.individualInterventionPlanRepository.deleteById(id);
  }


  @get('/individual-intervention-plans-migrant', {
    responses: {
      '200': {
        description: 'Array of IndividualInterventionPlan model instances',
      },
    },
  })
  async find_migrant (
    @param.query.string('lang') lang = 'en',
    @param.query.number('user_id') user_id: number
  ): Promise<void> {

    //    return this.individualInterventionPlanRepository.dataSource.execute("select json_agg(jj.*)::jsonb from (select iip.*, (select json_agg(kk.*)::jsonb from (SELECT *,(select itt.intervention_title from intervention_types_translation itt where itt.id=iipi.intervention_type and lang='" + lang + "'), (select ip.process_id from intervention_processes ip where ip.intervention_type = iipi.intervention_type), (select json_agg(itv.tenant_id)::jsonb from intervention_type_validator itv where itv.intervention_type_id=iipi.intervention_type) as validators  FROM individual_intervention_plan_interventions iipi where iipi.list_id = iip.id) kk) as interventions from individual_intervention_plan iip where iip.user_id=" + user_id + ") jj");
    return this.individualInterventionPlanRepository.dataSource.execute("select iip.*, (select json_agg(kk.*)::jsonb from (SELECT *,(select itt.intervention_title from intervention_types_translation itt where itt.id=iipi.intervention_type and lang=$1), (select ip.process_id from intervention_processes ip where ip.intervention_type = iipi.intervention_type), (select json_agg(itv.tenant_id)::jsonb from intervention_type_validator itv where itv.intervention_type_id=iipi.intervention_type) as validators  FROM individual_intervention_plan_interventions iipi where iipi.list_id = iip.id) kk) as interventions from individual_intervention_plan iip where iip.user_id=$2", [lang, user_id]);
  }

  @get('/individual-intervention-plans-ngo', {
    responses: {
      '200': {
        description: 'Array of IndividualInterventionPlan model instances',
      },
    },
  })
  async find_ngo (
    @param.query.string('lang') lang = 'en',
    @param.query.number('tenantId') tenantId = 1
  ): Promise<void> {

    //    return this.individualInterventionPlanRepository.dataSource.execute("select json_agg(jj.*)::jsonb from (select iip.*, (select json_agg(kk.*)::jsonb from (SELECT *,(select itt.intervention_title from intervention_types_translation itt where itt.id=iipi.intervention_type and lang='" + lang + "'), (select ip.process_id from intervention_processes ip where ip.intervention_type = iipi.intervention_type), (select json_agg(itv.tenant_id)::jsonb from intervention_type_validator itv where itv.intervention_type_id=iipi.intervention_type) as validators  FROM individual_intervention_plan_interventions iipi where iipi.list_id = iip.id) kk) as interventions from individual_intervention_plan iip where iip.user_id=" + user_id + ") jj");
    //    return this.individualInterventionPlanRepository.dataSource.execute("select iip.*, (select json_agg(iipi.*)::jsonb from individual_intervention_plan_interventions iipi where iipi.validationrequestdate is not null and iipi.list_id=iip.id) as interventions from individual_intervention_plan iip where iip.id in (select distinct iipi.list_id from individual_intervention_plan_interventions iipi where iipi.validationrequestdate is not null) ");
    return this.individualInterventionPlanRepository.dataSource.execute("select iip.*, (select json_agg(kk.*):: jsonb from(select iipi.*, (select itt.intervention_title from intervention_types_translation itt where itt.id = iipi.intervention_type and itt.lang = $1) from individual_intervention_plan_interventions iipi where iipi.validationrequestdate is not null and iipi.list_id = iip.id) kk) as interventions from individual_intervention_plan iip where iip.id in (select distinct iipi.list_id from individual_intervention_plan_interventions iipi where iipi.validationrequestdate is not null  AND iipi.validation_date is null and iipi.validating_user_tenant = $2) ", [lang, tenantId]);
  }

  async asyncForEach (array: any, callback: any) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

}
