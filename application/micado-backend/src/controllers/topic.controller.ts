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
import { Topic } from '../models';
import { TopicRepository } from '../repositories';
import { SettingsRepository } from '../repositories';
import { LanguagesRepository } from '../repositories';

export class TopicController {
  constructor(
    @repository(TopicRepository) public topicRepository: TopicRepository,
    @repository(SettingsRepository) protected settingsRepository: SettingsRepository,
    @repository(LanguagesRepository) protected languagesRepository: LanguagesRepository,
  ) { }

  @post('/topics', {
    responses: {
      '200': {
        description: 'Topic model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Topic) } },
      },
    },
  })
  async create (
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Topic, {
            title: 'NewTopic',
            exclude: ['id'],
          }),
        },
      },
    })
    topic: Omit<Topic, 'id'>,
  ): Promise<Topic> {
    return this.topicRepository.create(topic);
  }

  @get('/topics/count', {
    responses: {
      '200': {
        description: 'Topic model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count (
    @param.where(Topic) where?: Where<Topic>,
  ): Promise<Count> {
    return this.topicRepository.count(where);
  }

  @get('/topics', {
    responses: {
      '200': {
        description: 'Array of Topic model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Topic, { includeRelations: true }),
            },
          },
        },
      },
    },
  })
  async find (
    @param.filter(Topic) filter?: Filter<Topic>,
  ): Promise<Topic[]> {
    return this.topicRepository.find(filter);
  }

  @patch('/topics', {
    responses: {
      '200': {
        description: 'Topic PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll (
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Topic, { partial: true }),
        },
      },
    })
    topic: Topic,
    @param.where(Topic) where?: Where<Topic>,
  ): Promise<Count> {
    return this.topicRepository.updateAll(topic, where);
  }

  @get('/topics/{id}', {
    responses: {
      '200': {
        description: 'Topic model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Topic, { includeRelations: true }),
          },
        },
      },
    },
  })
  async findById (
    @param.path.number('id') id: number,
    @param.filter(Topic, { exclude: 'where' }) filter?: FilterExcludingWhere<Topic>
  ): Promise<Topic> {
    return this.topicRepository.findById(id, filter);
  }

  @patch('/topics/{id}', {
    responses: {
      '204': {
        description: 'Topic PATCH success',
      },
    },
  })
  async updateById (
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Topic, { partial: true }),
        },
      },
    })
    topic: Topic,
  ): Promise<void> {
    await this.topicRepository.updateById(id, topic);
  }

  @put('/topics/{id}', {
    responses: {
      '204': {
        description: 'Topic PUT success',
      },
    },
  })
  async replaceById (
    @param.path.number('id') id: number,
    @requestBody() topic: Topic,
  ): Promise<void> {
    await this.topicRepository.replaceById(id, topic);
  }

  @del('/topics/{id}', {
    responses: {
      '204': {
        description: 'Topic DELETE success',
      },
    },
  })
  async deleteById (@param.path.number('id') id: number): Promise<void> {
    await this.topicRepository.deleteById(id);
  }



  @get('/topics-migrant', {
    responses: {
      '200': {
        description: 'Topic GET for the frontend',
      },
    },
  })
  async translatedunion (
    @param.query.string('defaultlang') defaultlang = 'en',
    @param.query.string('currentlang') currentlang = 'en'
  ): Promise<void> {
    return this.topicRepository.dataSource.execute("select * from topic t inner join topic_translation_prod tt on t.id=tt.id and tt.lang=$2 union select * from topic t inner join topic_translation_prod  tt on t.id = tt.id and tt.lang = $1and t.id not in (select t.id from topic t inner join topic_translation_prod tt on t.id = tt.id and tt.lang = $2)",
    [defaultlang, currentlang]);
  }

  @get('/topics/to-production', {
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
    this.topicRepository.dataSource.execute("insert into topic_translation_prod(id, lang ,topic,translation_date) select topic_translation.id, topic_translation.lang, topic_translation.topic, topic_translation.translation_date from topic_translation  where "+'"translationState"'+" >= '2' and id=$1 and lang=$2", [id, def_lang.value]);
    languages.forEach((lang:any)=>{
      this.topicRepository.dataSource.execute("insert into topic_translation_prod(id, lang ,topic,translation_date) select topic_translation.id, topic_translation.lang, topic_translation.topic, topic_translation.translation_date from topic_translation  where "+'"translationState"'+" > '2' and id=$1 and lang=$2", [id, lang.lang]);
    })
  }
}
