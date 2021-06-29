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
  EventCategory,
  EventCategoryTranslationProd,
} from '../models';
import {EventCategoryRepository} from '../repositories';

export class EventCategoryEventCategoryTranslationProdController {
  constructor(
    @repository(EventCategoryRepository) protected eventCategoryRepository: EventCategoryRepository,
  ) { }

  @get('/event-categories/{id}/event-category-translation-prods', {
    responses: {
      '200': {
        description: 'Array of EventCategory has many EventCategoryTranslationProd',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(EventCategoryTranslationProd)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<EventCategoryTranslationProd>,
  ): Promise<EventCategoryTranslationProd[]> {
    return this.eventCategoryRepository.translations_prod(id).find(filter);
  }

  @post('/event-categories/{id}/event-category-translation-prods', {
    responses: {
      '200': {
        description: 'EventCategory model instance',
        content: {'application/json': {schema: getModelSchemaRef(EventCategoryTranslationProd)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof EventCategory.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EventCategoryTranslationProd, {
            title: 'NewEventCategoryTranslationProdInEventCategory',
            //exclude: ['id'],
            optional: ['id']
          }),
        },
      },
    }) eventCategoryTranslationProd: Omit<EventCategoryTranslationProd, 'id'>,
  ): Promise<EventCategoryTranslationProd> {
    return this.eventCategoryRepository.translations_prod(id).create(eventCategoryTranslationProd);
  }

  @patch('/event-categories/{id}/event-category-translation-prods', {
    responses: {
      '200': {
        description: 'EventCategory.EventCategoryTranslationProd PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EventCategoryTranslationProd, {partial: true}),
        },
      },
    })
    eventCategoryTranslationProd: Partial<EventCategoryTranslationProd>,
    @param.query.object('where', getWhereSchemaFor(EventCategoryTranslationProd)) where?: Where<EventCategoryTranslationProd>,
  ): Promise<Count> {
    return this.eventCategoryRepository.translations_prod(id).patch(eventCategoryTranslationProd, where);
  }

  @del('/event-categories/{id}/event-category-translation-prods', {
    responses: {
      '200': {
        description: 'EventCategory.EventCategoryTranslationProd DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(EventCategoryTranslationProd)) where?: Where<EventCategoryTranslationProd>,
  ): Promise<Count> {
    return this.eventCategoryRepository.translations_prod(id).delete(where);
  }
}
