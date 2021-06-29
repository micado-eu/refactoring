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
  EventCategoryTranslation,
} from '../models';
import { EventCategoryRepository } from '../repositories';

export class EventCategoryEventCategoryTranslationController {
  constructor(
    @repository(EventCategoryRepository) protected eventCategoryRepository: EventCategoryRepository,
  ) { }

  @get('/event-categories/{id}/event-category-translations', {
    responses: {
      '200': {
        description: 'Array of EventCategory has many EventCategoryTranslation',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(EventCategoryTranslation) },
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<EventCategoryTranslation>,
  ): Promise<EventCategoryTranslation[]> {
    return this.eventCategoryRepository.translations(id).find(filter);
  }

  @post('/event-categories/{id}/event-category-translations', {
    responses: {
      '200': {
        description: 'EventCategory model instance',
        content: { 'application/json': { schema: getModelSchemaRef(EventCategoryTranslation) } },
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof EventCategory.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EventCategoryTranslation, {
            title: 'NewEventCategoryTranslationInEventCategory',
            //           exclude: ['id'],
            optional: ['id']
          }),
        },
      },
    }) eventCategoryTranslation: EventCategoryTranslation,
    //    }) eventCategoryTranslation: Omit < EventCategoryTranslation, 'id' >,
  ): Promise<EventCategoryTranslation> {
    return this.eventCategoryRepository.translations(id).create(eventCategoryTranslation);
  }

  @patch('/event-categories/{id}/event-category-translations', {
    responses: {
      '200': {
        description: 'EventCategory.EventCategoryTranslation PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EventCategoryTranslation, { partial: true }),
        },
      },
    })
    eventCategoryTranslation: Partial<EventCategoryTranslation>,
    @param.query.object('where', getWhereSchemaFor(EventCategoryTranslation)) where?: Where<EventCategoryTranslation>,
  ): Promise<Count> {
    return this.eventCategoryRepository.translations(id).patch(eventCategoryTranslation, where);
  }

  @del('/event-categories/{id}/event-category-translations', {
    responses: {
      '200': {
        description: 'EventCategory.EventCategoryTranslation DELETE success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(EventCategoryTranslation)) where?: Where<EventCategoryTranslation>,
  ): Promise<Count> {
    return this.eventCategoryRepository.translations(id).delete(where);
  }
}
