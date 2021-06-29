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
import { InterventionCategory } from '../models';
import { InterventionCategoryRepository } from '../repositories';
import { SettingsRepository } from '../repositories';
import { LanguagesRepository } from '../repositories';

export class InterventionCategoryController {
  constructor(
    @repository(InterventionCategoryRepository) public interventionCategoryRepository: InterventionCategoryRepository,
    @repository(SettingsRepository) protected settingsRepository: SettingsRepository,
    @repository(LanguagesRepository) protected languagesRepository: LanguagesRepository,
  ) { }

  @post('/intervention-categories', {
    responses: {
      '200': {
        description: 'InterventionCategory model instance',
        content: { 'application/json': { schema: getModelSchemaRef(InterventionCategory) } },
      },
    },
  })
  async create (
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InterventionCategory, {
            title: 'NewInterventionCategory',
            exclude: ['id'],
          }),
        },
      },
    })
    interventionCategory: Omit<InterventionCategory, 'id'>,
  ): Promise<InterventionCategory> {
    return this.interventionCategoryRepository.create(interventionCategory);
  }

  @get('/intervention-categories/count', {
    responses: {
      '200': {
        description: 'InterventionCategory model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count (
    @param.where(InterventionCategory) where?: Where<InterventionCategory>,
  ): Promise<Count> {
    return this.interventionCategoryRepository.count(where);
  }

  @get('/intervention-categories', {
    responses: {
      '200': {
        description: 'Array of InterventionCategory model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(InterventionCategory, { includeRelations: true }),
            },
          },
        },
      },
    },
  })
  async find (
    @param.filter(InterventionCategory) filter?: Filter<InterventionCategory>,
  ): Promise<InterventionCategory[]> {
    return this.interventionCategoryRepository.find(filter);
  }

  @patch('/intervention-categories', {
    responses: {
      '200': {
        description: 'InterventionCategory PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll (
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InterventionCategory, { partial: true }),
        },
      },
    })
    interventionCategory: InterventionCategory,
    @param.where(InterventionCategory) where?: Where<InterventionCategory>,
  ): Promise<Count> {
    return this.interventionCategoryRepository.updateAll(interventionCategory, where);
  }

  @get('/intervention-categories/{id}', {
    responses: {
      '200': {
        description: 'InterventionCategory model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(InterventionCategory, { includeRelations: true }),
          },
        },
      },
    },
  })
  async findById (
    @param.path.number('id') id: number,
    @param.filter(InterventionCategory, { exclude: 'where' }) filter?: FilterExcludingWhere<InterventionCategory>
  ): Promise<InterventionCategory> {
    return this.interventionCategoryRepository.findById(id, filter);
  }

  @patch('/intervention-categories/{id}', {
    responses: {
      '204': {
        description: 'InterventionCategory PATCH success',
      },
    },
  })
  async updateById (
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InterventionCategory, { partial: true }),
        },
      },
    })
    interventionCategory: InterventionCategory,
  ): Promise<void> {
    await this.interventionCategoryRepository.updateById(id, interventionCategory);
  }

  @put('/intervention-categories/{id}', {
    responses: {
      '204': {
        description: 'InterventionCategory PUT success',
      },
    },
  })
  async replaceById (
    @param.path.number('id') id: number,
    @requestBody() interventionCategory: InterventionCategory,
  ): Promise<void> {
    await this.interventionCategoryRepository.replaceById(id, interventionCategory);
  }

  @del('/intervention-categories/{id}', {
    responses: {
      '204': {
        description: 'InterventionCategory DELETE success',
      },
    },
  })
  async deleteById (@param.path.number('id') id: number): Promise<void> {
    await this.interventionCategoryRepository.deleteById(id);
  }

  @get('/intervention-categories-migrant', {
    responses: {
      '200': {
        description: 'intervention-categories GET for the frontend',
      },
    },
  })
  async translatedunion (
    @param.query.string('defaultlang') defaultlang = 'en',
    @param.query.string('currentlang') currentlang = 'en'
  ): Promise<void> {
    return this.interventionCategoryRepository.dataSource.execute(
      "select * from intervention_category t inner join intervention_category_translation tt on t.id=tt.id and tt.lang=$2 union select * from intervention_category t inner join intervention_category_translation tt on t.id = tt.id and tt.lang = $1 and t.id not in (select t.id from intervention_category t inner join intervention_category_translation tt on t.id = tt.id and tt.lang = $2)", 
      [defaultlang, currentlang]
    );
  }

  @get('/intervention-categories/to-production', {
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
    this.interventionCategoryRepository.dataSource.execute("insert into intervention_category_translation_prod(id, lang ,title,translation_date) select intervention_category_translation.id, intervention_category_translation.lang, intervention_category_translation.title, intervention_category_translation.translation_date from intervention_category_translation  where "+'"translationState"'+" >= '2' and id=$1 and lang=$2", [id, def_lang.value]);
    languages.forEach((lang:any)=>{
      this.interventionCategoryRepository.dataSource.execute("insert into intervention_category_translation_prod(id, lang ,title,translation_date) select intervention_category_translation.id, intervention_category_translation.lang, intervention_category_translation.title, intervention_category_translation.translation_date from intervention_category_translation  where "+'"translationState"'+" > '2' and id=$1 and lang=$2", [id, lang.lang]);
    })
  }
}
