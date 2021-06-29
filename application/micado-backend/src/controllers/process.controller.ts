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
import { Process } from '../models';
import { ProcessRepository } from '../repositories';
import { SettingsRepository } from '../repositories';
import { LanguagesRepository } from '../repositories';
import { roles } from '../comp/lb4-authorization/src';


export class ProcessController {
  constructor(
    @repository(ProcessRepository) public processRepository: ProcessRepository,
    @repository(SettingsRepository) protected settingsRepository: SettingsRepository,
    @repository(LanguagesRepository) protected languagesRepository: LanguagesRepository,
  ) { }

  @post('/processes', {
    responses: {
      '200': {
        description: 'Process model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Process) } },
      },
    },
  })
  async create (
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Process, {
            title: 'NewProcess',
            exclude: ['id'],
          }),
        },
      },
    })
    process: Omit<Process, 'id'>,
  ): Promise<Process> {
    return this.processRepository.create(process);
  }

  @roles('realm:migrants')
  @get('/processes/count', {
    responses: {
      '200': {
        description: 'Process model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count (
    @param.where(Process) where?: Where<Process>,
  ): Promise<Count> {
    return this.processRepository.count(where);
  }

  @get('/processes', {
    responses: {
      '200': {
        description: 'Array of Process model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Process, { includeRelations: true }),
            },
          },
        },
      },
    },
  })
  async find (
    @param.filter(Process) filter?: Filter<Process>,
  ): Promise<Process[]> {
    return this.processRepository.find(filter);
  }

  @patch('/processes', {
    responses: {
      '200': {
        description: 'Process PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll (
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Process, { partial: true }),
        },
      },
    })
    process: Process,
    @param.where(Process) where?: Where<Process>,
  ): Promise<Count> {
    return this.processRepository.updateAll(process, where);
  }

  @get('/processes/{id}', {
    responses: {
      '200': {
        description: 'Process model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Process, { includeRelations: true }),
          },
        },
      },
    },
  })
  async findById (
    @param.path.number('id') id: number,
    @param.filter(Process, { exclude: 'where' }) filter?: FilterExcludingWhere<Process>
  ): Promise<Process> {
    return this.processRepository.findById(id, filter);
  }

  @patch('/processes/{id}', {
    responses: {
      '204': {
        description: 'Process PATCH success',
      },
    },
  })
  async updateById (
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Process, { partial: true }),
        },
      },
    })
    process: Process,
  ): Promise<void> {
    await this.processRepository.updateById(id, process);
  }

  @put('/processes/{id}', {
    responses: {
      '204': {
        description: 'Process PUT success',
      },
    },
  })
  async replaceById (
    @param.path.number('id') id: number,
    @requestBody() process: Process,
  ): Promise<void> {
    await this.processRepository.replaceById(id, process);
  }

  @del('/processes/{id}', {
    responses: {
      '204': {
        description: 'Process DELETE success',
      },
    },
  })
  async deleteById (@param.path.number('id') id: number): Promise<void> {
    await this.processRepository.deleteById(id);
  }

  @get('/processes-migrant', {
    responses: {
      '200': {
        description: 'process GET for the frontend',
      },
    },
  })
  async translatedunion (
    @param.query.string('defaultlang') defaultlang = 'en',
    @param.query.string('currentlang') currentlang = 'en'
  ): Promise<void> {
    return this.processRepository.dataSource.execute(
      "select *, (select to_jsonb(array_agg(pt.id_topic)) from process_topic pt where pt.id_process=t.id) as topics, (select to_jsonb(array_agg(pu.id_user_types)) from process_users pu where pu.id_process=t.id) as users,(select coalesce(avg(value),0) from ratings r where r.content_type=1 AND r.content_id=t.id) as rating from process t inner join process_translation_prod tt on t.id=tt.id and tt.lang=$2 union select *, (select to_jsonb(array_agg(pt.id_topic)) from process_topic pt where pt.id_process=t.id) as topics, (select to_jsonb(array_agg(pu.id_user_types)) from process_users pu where pu.id_process=t.id) as users,(select coalesce(avg(value),0) from ratings r where r.content_type=1 AND r.content_id=t.id) as rating from process t inner join process_translation_prod tt on t.id = tt.id and tt.lang = $1 and t.id not in (select t.id from process t inner join process_translation_prod tt on t.id = tt.id and tt.lang = $2)",
      [defaultlang, currentlang]
    );
  }

  @get('/temp-processes-migrant', {
    responses: {
      '200': {
        description: 'process GET for the frontend',
      },
    },
  })
  async tempunion (
    @param.query.string('defaultlang') defaultlang = 'en',
    @param.query.string('currentlang') currentlang = 'en'
  ): Promise<void> {
    return this.processRepository.dataSource.execute(
      "select *, (select to_jsonb(array_agg(pt.id_topic)) from process_topic pt where pt.id_process=t.id) as topics, (select to_jsonb(array_agg(pu.id_user_types)) from process_users pu where pu.id_process=t.id) as users,(select coalesce(avg(value),0) from ratings r where r.content_type=1 AND r.content_id=t.id) as rating from process t inner join process_translation tt on t.id=tt.id and tt.lang=$2 union select *, (select to_jsonb(array_agg(pt.id_topic)) from process_topic pt where pt.id_process=t.id) as topics, (select to_jsonb(array_agg(pu.id_user_types)) from process_users pu where pu.id_process=t.id) as users,(select coalesce(avg(value),0) from ratings r where r.content_type=1 AND r.content_id=t.id) as rating from process t inner join process_translation tt on t.id = tt.id and tt.lang = $1 and t.id not in (select t.id from process t inner join process_translation tt on t.id = tt.id and tt.lang = $2)",
      [defaultlang, currentlang]
    );
  }

  @get('/processes/to-production', {
    responses: {
      '200': {
        description: 'process GET for the frontend',
      },
    },
  })
  async publish (
    @param.query.number('id') id: number,
  ): Promise<void> {
    let settings = await this.settingsRepository.find({});
    //   let lang_filter = { where: { active: true } }
    let languages = await this.languagesRepository.find({ where: { active: true } });
    let def_lang = settings.filter((el: any) => { return el.key === 'default_language' })[0]
    let idx = languages.findIndex(el => el.lang == def_lang.value)
    languages.splice(idx, 1)

    this.processRepository.dataSource.execute("insert into process_translation_prod(id, lang ,process , description ,translation_date) select process_translation.id, process_translation.lang, process_translation.process, process_translation.description , process_translation.translation_date from process_translation  where " + '"translationState"' + " >= '2' and id=$1 and lang=$2", [id, def_lang.value]);
    languages.forEach((lang: any) => {
      this.processRepository.dataSource.execute("insert into process_translation_prod(id, lang ,process , description ,translation_date) select process_translation.id, process_translation.lang, process_translation.process, process_translation.description , process_translation.translation_date from process_translation  where " + '"translationState"' + " > '2' and id=$1 and lang=$2", [id, lang.lang]);
    })
  }
}


