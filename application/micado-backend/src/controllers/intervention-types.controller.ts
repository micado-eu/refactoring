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
import {InterventionTypes} from '../models';
import {InterventionTypesRepository} from '../repositories';
import { SettingsRepository } from '../repositories';
import { LanguagesRepository } from '../repositories';

export class InterventionTypesController {
  constructor(
    @repository(InterventionTypesRepository) public interventionTypesRepository : InterventionTypesRepository,
    @repository(SettingsRepository) protected settingsRepository: SettingsRepository,
    @repository(LanguagesRepository) protected languagesRepository: LanguagesRepository,
  ) {}

  @post('/intervention-types', {
    responses: {
      '200': {
        description: 'InterventionTypes model instance',
        content: {'application/json': {schema: getModelSchemaRef(InterventionTypes)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InterventionTypes, {
            title: 'NewInterventionTypes',
            exclude: ['id'],
          }),
        },
      },
    })
    interventionTypes: Omit<InterventionTypes, 'id'>,
  ): Promise<InterventionTypes> {
    return this.interventionTypesRepository.create(interventionTypes);
  }

  @get('/intervention-types/count', {
    responses: {
      '200': {
        description: 'InterventionTypes model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(InterventionTypes) where?: Where<InterventionTypes>,
  ): Promise<Count> {
    return this.interventionTypesRepository.count(where);
  }

  @get('/intervention-types', {
    responses: {
      '200': {
        description: 'Array of InterventionTypes model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(InterventionTypes, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(InterventionTypes) filter?: Filter<InterventionTypes>,
  ): Promise<InterventionTypes[]> {
    return this.interventionTypesRepository.find(filter);
  }

  @patch('/intervention-types', {
    responses: {
      '200': {
        description: 'InterventionTypes PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InterventionTypes, {partial: true}),
        },
      },
    })
    interventionTypes: InterventionTypes,
    @param.where(InterventionTypes) where?: Where<InterventionTypes>,
  ): Promise<Count> {
    return this.interventionTypesRepository.updateAll(interventionTypes, where);
  }

  @get('/intervention-types/{id}', {
    responses: {
      '200': {
        description: 'InterventionTypes model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(InterventionTypes, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(InterventionTypes, {exclude: 'where'}) filter?: FilterExcludingWhere<InterventionTypes>
  ): Promise<InterventionTypes> {
    return this.interventionTypesRepository.findById(id, filter);
  }

  @patch('/intervention-types/{id}', {
    responses: {
      '204': {
        description: 'InterventionTypes PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InterventionTypes, {partial: true}),
        },
      },
    })
    interventionTypes: InterventionTypes,
  ): Promise<void> {
    await this.interventionTypesRepository.updateById(id, interventionTypes);
  }

  @put('/intervention-types/{id}', {
    responses: {
      '204': {
        description: 'InterventionTypes PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() interventionTypes: InterventionTypes,
  ): Promise<void> {
    await this.interventionTypesRepository.replaceById(id, interventionTypes);
  }

  @del('/intervention-types/{id}', {
    responses: {
      '204': {
        description: 'InterventionTypes DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.interventionTypesRepository.deleteById(id);
  }

  @get('/intervention-types/to-production', {
    responses: {
      '200': {
        description: 'process GET for the frontend',
      },
    },
  })
  async publish (
    @param.query.number('id') id:number,
  ): Promise<void> {
    let settings = await this.settingsRepository.find({});
    //   let lang_filter = { where: { active: true } }
    let languages = await this.languagesRepository.find({ where: { active: true } });
    let def_lang = settings.filter((el: any) => { return el.key === 'default_language' })[0]
    let idx = languages.findIndex(el => el.lang == def_lang.value)
    languages.splice(idx, 1)
    this.interventionTypesRepository.dataSource.execute("insert into intervention_types_translation_prod(id, lang ,intervention_title,description,translation_date) select intervention_types_translation.id, intervention_types_translation.lang, intervention_types_translation.intervention_title, intervention_types_translation.description, intervention_types_translation.translation_date from intervention_types_translation  where "+'"translationState"'+" >= '2' and id=$1 and lang=$2", [id, def_lang.value]);
    languages.forEach((lang:any)=>{
      this.interventionTypesRepository.dataSource.execute("insert into intervention_types_translation_prod(id, lang ,intervention_title,description,translation_date) select intervention_types_translation.id, intervention_types_translation.lang, intervention_types_translation.intervention_title, intervention_types_translation.description, intervention_types_translation.translation_date from intervention_types_translation  where "+'"translationState"'+" > '2' and id=$1 and lang=$2", [id, lang.lang]);
    })
  }
}
