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
import { EventCategory } from '../models';
import { EventCategoryRepository } from '../repositories';

export class EventCategoryController {
  constructor(
    @repository(EventCategoryRepository)
    public eventCategoryRepository: EventCategoryRepository,
  ) { }

  @post('/event-categories', {
    responses: {
      '200': {
        description: 'EventCategory model instance',
        content: { 'application/json': { schema: getModelSchemaRef(EventCategory) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EventCategory, {
            title: 'NewEventCategory',
            exclude: ['id'],
          }),
        },
      },
    })
    eventCategory: Omit<EventCategory, 'id'>,
  ): Promise<EventCategory> {
    return this.eventCategoryRepository.create(eventCategory);
  }

  @get('/event-categories/count', {
    responses: {
      '200': {
        description: 'EventCategory model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.where(EventCategory) where?: Where<EventCategory>,
  ): Promise<Count> {
    return this.eventCategoryRepository.count(where);
  }

  @get('/event-categories', {
    responses: {
      '200': {
        description: 'Array of EventCategory model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(EventCategory, { includeRelations: true }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(EventCategory) filter?: Filter<EventCategory>,
  ): Promise<EventCategory[]> {
    return this.eventCategoryRepository.find(filter);
  }

  @patch('/event-categories', {
    responses: {
      '200': {
        description: 'EventCategory PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EventCategory, { partial: true }),
        },
      },
    })
    eventCategory: EventCategory,
    @param.where(EventCategory) where?: Where<EventCategory>,
  ): Promise<Count> {
    return this.eventCategoryRepository.updateAll(eventCategory, where);
  }

  @get('/event-categories/{id}', {
    responses: {
      '200': {
        description: 'EventCategory model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(EventCategory, { includeRelations: true }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(EventCategory, { exclude: 'where' }) filter?: FilterExcludingWhere<EventCategory>
  ): Promise<EventCategory> {
    return this.eventCategoryRepository.findById(id, filter);
  }

  @patch('/event-categories/{id}', {
    responses: {
      '204': {
        description: 'EventCategory PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EventCategory, { partial: true }),
        },
      },
    })
    eventCategory: EventCategory,
  ): Promise<void> {
    await this.eventCategoryRepository.updateById(id, eventCategory);
  }

  @put('/event-categories/{id}', {
    responses: {
      '204': {
        description: 'EventCategory PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() eventCategory: EventCategory,
  ): Promise<void> {
    await this.eventCategoryRepository.replaceById(id, eventCategory);
  }

  @del('/event-categories/{id}', {
    responses: {
      '204': {
        description: 'EventCategory DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.eventCategoryRepository.deleteById(id);
  }

  @get('/temp-event-categories', {
    responses: {
      '200': {
        description: 'Gets published event category entries with translation (temp)',
      },
    },
  })
  async temptranslatedunion(
    @param.query.string('defaultlang') defaultlang = 'en',
    @param.query.string('currentlang') currentlang = 'en'
  ): Promise<void> {
    return this.eventCategoryRepository.dataSource.execute(`
    select
      *
    from
      event_category t
    inner join event_category_translation tt on
      t.id = tt.id
      and tt.lang = $2
    union
    select
      *
    from
    event_category t
    inner join event_category_translation tt on
      t.id = tt.id
      and tt.lang = $1
      and t.id not in (
      select
        t.id
      from
      event_category t
      inner join event_category_translation tt on
        t.id = tt.id
        and tt.lang = $2)
    `, [defaultlang, currentlang]);
  }

  @get('/temp-event-category', {
    responses: {
      '200': {
        description: 'Gets published event category with translation (temp)',
      },
    },
  })
  async temptranslatedunionsingle(
    @param.query.string('defaultlang') defaultlang = 'en',
    @param.query.string('currentlang') currentlang = 'en',
    @param.query.string('id') id = -1
  ): Promise<void> {
    return this.eventCategoryRepository.dataSource.execute(`
    select
      *
    from
      event_category t
    inner join event_category_translation tt on
      t.id = tt.id
      and tt.lang = $2
    where
      t.id = $3
    union
    select
      *
    from
      event_category t
    inner join event_category_translation tt on
      t.id = tt.id
      and tt.lang = $1
      and t.id not in (
      select
        t.id
      from
        event_category t
      inner join event_category_translation tt on
        t.id = tt.id
        and tt.lang = $2)
    `, [defaultlang, currentlang, id]);


  }
  @get('/production-event-categories', {
    responses: {
      '200': {
        description: 'Gets published event category entries with translation (prod)',
      },
    },
  })
  async translatedunion(
    @param.query.string('defaultlang') defaultlang = 'en',
    @param.query.string('currentlang') currentlang = 'en'
  ): Promise<void> {
    return this.eventCategoryRepository.dataSource.execute(`
    select
      *
    from
      event_category t
    inner join event_category_translation_prod tt on
      t.id = tt.id
      and tt.lang = $2
    union
    select
      *
    from
    event_category t
    inner join event_category_translation_prod tt on
      t.id = tt.id
      and tt.lang = $1
      and t.id not in (
      select
        t.id
      from
      event_category t
      inner join event_category_translation_prod tt on
        t.id = tt.id
        and tt.lang = $2)
    `, [defaultlang, currentlang]);
  }

  @get('/production-event-category', {
    responses: {
      '200': {
        description: 'Gets published event category with translation (prod)',
      },
    },
  })
  async translatedunionsingle(
    @param.query.string('defaultlang') defaultlang = 'en',
    @param.query.string('currentlang') currentlang = 'en',
    @param.query.string('id') id = -1
  ): Promise<void> {
    return this.eventCategoryRepository.dataSource.execute(`
    select
      *
    from
      event_category t
    inner join event_category_translation_prod tt on
      t.id = tt.id
      and tt.lang = $2
    where
      t.id = $3
    union
    select
      *
    from
      event_category t
    inner join event_category_translation_prod tt on
      t.id = tt.id
      and tt.lang = $1
      and t.id not in (
      select
        t.id
      from
        event_category t
      inner join event_category_translation_prod tt on
        t.id = tt.id
        and tt.lang = $1)
    `, [defaultlang, currentlang, id]);
  }
}