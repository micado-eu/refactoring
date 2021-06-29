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
  EventTopic,
} from '../models';
import {EventRepository} from '../repositories';

export class EventEventTopicController {
  constructor(
    @repository(EventRepository) protected eventRepository: EventRepository,
  ) { }

  @get('/events/{id}/event-topics', {
    responses: {
      '200': {
        description: 'Array of Event has many EventTopic',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(EventTopic)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<EventTopic>,
  ): Promise<EventTopic[]> {
    return this.eventRepository.eventTopics(id).find(filter);
  }

  @post('/events/{id}/event-topics', {
    responses: {
      '200': {
        description: 'Event model instance',
        content: {'application/json': {schema: getModelSchemaRef(EventTopic)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Event.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EventTopic, {
            title: 'NewEventTopicInEvent',
 //           exclude: ['idEvent'],
            optional: ['idEvent']
          }),
        },
      },
    }) eventTopic: EventTopic,
 // }) eventTopic: Omit<EventTopic, 'idEvent'>,
  ): Promise<EventTopic> {
    return this.eventRepository.eventTopics(id).create(eventTopic);
  }

  @patch('/events/{id}/event-topics', {
    responses: {
      '200': {
        description: 'Event.EventTopic PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EventTopic, {partial: true}),
        },
      },
    })
    eventTopic: Partial<EventTopic>,
    @param.query.object('where', getWhereSchemaFor(EventTopic)) where?: Where<EventTopic>,
  ): Promise<Count> {
    return this.eventRepository.eventTopics(id).patch(eventTopic, where);
  }

  @del('/events/{id}/event-topics', {
    responses: {
      '200': {
        description: 'Event.EventTopic DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(EventTopic)) where?: Where<EventTopic>,
  ): Promise<Count> {
    return this.eventRepository.eventTopics(id).delete(where);
  }
}
