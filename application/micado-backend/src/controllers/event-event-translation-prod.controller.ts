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
  Event,
  EventTranslationProd,
} from '../models';
import {EventRepository} from '../repositories';

export class EventEventTranslationProdController {
  constructor(
    @repository(EventRepository) protected eventRepository: EventRepository,
  ) { }

  @get('/events/{id}/event-translation-prods', {
    responses: {
      '200': {
        description: 'Array of Event has many EventTranslationProd',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(EventTranslationProd)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<EventTranslationProd>,
  ): Promise<EventTranslationProd[]> {
    return this.eventRepository.translations_prod(id).find(filter);
  }

  @post('/events/{id}/event-translation-prods', {
    responses: {
      '200': {
        description: 'Event model instance',
        content: {'application/json': {schema: getModelSchemaRef(EventTranslationProd)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Event.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EventTranslationProd, {
            title: 'NewEventTranslationProdInEvent',
            //exclude: ['id'],
            optional: ['id']
          }),
        },
      },
    }) eventTranslationProd: Omit<EventTranslationProd, 'id'>,
  ): Promise<EventTranslationProd> {
    return this.eventRepository.translations_prod(id).create(eventTranslationProd);
  }

  @patch('/events/{id}/event-translation-prods', {
    responses: {
      '200': {
        description: 'Event.EventTranslationProd PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EventTranslationProd, {partial: true}),
        },
      },
    })
    eventTranslationProd: Partial<EventTranslationProd>,
    @param.query.object('where', getWhereSchemaFor(EventTranslationProd)) where?: Where<EventTranslationProd>,
  ): Promise<Count> {
    return this.eventRepository.translations_prod(id).patch(eventTranslationProd, where);
  }

  @del('/events/{id}/event-translation-prods', {
    responses: {
      '200': {
        description: 'Event.EventTranslationProd DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(EventTranslationProd)) where?: Where<EventTranslationProd>,
  ): Promise<Count> {
    return this.eventRepository.translations_prod(id).delete(where);
  }
}
