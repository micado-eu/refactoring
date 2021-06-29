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
import {Step} from '../models';
import {StepRepository} from '../repositories';
import { SettingsRepository } from '../repositories';
import { LanguagesRepository } from '../repositories';


export class StepController {
  constructor(
    @repository(StepRepository) public stepRepository : StepRepository,
    @repository(SettingsRepository) protected settingsRepository: SettingsRepository,
    @repository(LanguagesRepository) protected languagesRepository: LanguagesRepository,
  ) {}

  @post('/steps', {
    responses: {
      '200': {
        description: 'Step model instance',
        content: {'application/json': {schema: getModelSchemaRef(Step)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Step, {
            title: 'NewStep',
            
          }),
        },
      },
    })
    step: Step,
  ): Promise<Step> {
    return this.stepRepository.create(step);
  }

  @get('/steps/count', {
    responses: {
      '200': {
        description: 'Step model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Step) where?: Where<Step>,
  ): Promise<Count> {
    return this.stepRepository.count(where);
  }

  @get('/steps', {
    responses: {
      '200': {
        description: 'Array of Step model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Step, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Step) filter?: Filter<Step>,
  ): Promise<Step[]> {
    return this.stepRepository.find(filter);
  }

  @patch('/steps', {
    responses: {
      '200': {
        description: 'Step PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Step, {partial: true}),
        },
      },
    })
    step: Step,
    @param.where(Step) where?: Where<Step>,
  ): Promise<Count> {
    return this.stepRepository.updateAll(step, where);
  }

  @get('/steps/{id}', {
    responses: {
      '200': {
        description: 'Step model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Step, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Step, {exclude: 'where'}) filter?: FilterExcludingWhere<Step>
  ): Promise<Step> {
    return this.stepRepository.findById(id, filter);
  }

  @patch('/steps/{id}', {
    responses: {
      '204': {
        description: 'Step PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Step, {partial: true}),
        },
      },
    })
    step: Step,
  ): Promise<void> {
    await this.stepRepository.updateById(id, step);
  }

  @put('/steps/{id}', {
    responses: {
      '204': {
        description: 'Step PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() step: Step,
  ): Promise<void> {
    await this.stepRepository.replaceById(id, step);
  }

  @del('/steps/{id}', {
    responses: {
      '204': {
        description: 'Step DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.stepRepository.deleteById(id);
  }

  @get('/steps/to-production', {
    responses: {
      '200': {
        description: 'process GET for the frontend',
      },
    },
  })
  async publish (
    @param.query.string('id') id:string,
  ): Promise<void> {
    let settings = await this.settingsRepository.find({});
    //   let lang_filter = { where: { active: true } }
    let languages = await this.languagesRepository.find({ where: { active: true } });
    let def_lang = settings.filter((el: any) => { return el.key === 'default_language' })[0]
    let idx = languages.findIndex(el => el.lang == def_lang.value)
    languages.splice(idx, 1)
    this.stepRepository.dataSource.execute("insert into step_translation_prod(id, lang ,step , description ,translation_date) select step_translation.id, step_translation.lang, step_translation.step, step_translation.description , step_translation.translation_date from step_translation  where "+'"translationState"'+" >= '2' and id=$1 and lang=$2", [id, def_lang.value]);
    languages.forEach((lang:any)=>{
      this.stepRepository.dataSource.execute("insert into step_translation_prod(id, lang ,step , description ,translation_date) select step_translation.id, step_translation.lang, step_translation.step, step_translation.description , step_translation.translation_date from step_translation  where "+'"translationState"'+" > '2' and id=$1 and lang=$2", [id, lang.lang]);
    })
  }
}
