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
    EventUserTypes,
  } from '../models';
  import {EventRepository} from '../repositories';
  
  export class EventEventUserTypesController {
    constructor(
      @repository(EventRepository) protected eventRepository: EventRepository,
    ) { }
  
    @get('/events/{id}/event-user-types', {
      responses: {
        '200': {
          description: 'Array of Event has many EventUserTypes',
          content: {
            'application/json': {
              schema: {type: 'array', items: getModelSchemaRef(EventUserTypes)},
            },
          },
        },
      },
    })
    async find(
      @param.path.number('id') id: number,
      @param.query.object('filter') filter?: Filter<EventUserTypes>,
    ): Promise<EventUserTypes[]> {
      return this.eventRepository.eventUserTypes(id).find(filter);
    }
  
    @post('/events/{id}/event-user-types', {
      responses: {
        '200': {
          description: 'Event model instance',
          content: {'application/json': {schema: getModelSchemaRef(EventUserTypes)}},
        },
      },
    })
    async create(
      @param.path.number('id') id: typeof Event.prototype.id,
      @requestBody({
        content: {
          'application/json': {
            schema: getModelSchemaRef(EventUserTypes, {
              title: 'NewEventUserTypesInEvent',
   //           exclude: ['idEvent'],
              optional: ['idEvent']
            }),
          },
        },
      }) eventUserTypes: EventUserTypes,
   // }) eventUserTypes: Omit<EventUserTypes, 'idEvent'>,
    ): Promise<EventUserTypes> {
      return this.eventRepository.eventUserTypes(id).create(eventUserTypes);
    }
  
    @patch('/events/{id}/event-user-types', {
      responses: {
        '200': {
          description: 'Event.EventUserTypes PATCH success count',
          content: {'application/json': {schema: CountSchema}},
        },
      },
    })
    async patch(
      @param.path.number('id') id: number,
      @requestBody({
        content: {
          'application/json': {
            schema: getModelSchemaRef(EventUserTypes, {partial: true}),
          },
        },
      })
      eventUserTypes: Partial<EventUserTypes>,
      @param.query.object('where', getWhereSchemaFor(EventUserTypes)) where?: Where<EventUserTypes>,
    ): Promise<Count> {
      return this.eventRepository.eventUserTypes(id).patch(eventUserTypes, where);
    }
  
    @del('/events/{id}/event-user-types', {
      responses: {
        '200': {
          description: 'Event.EventUserTypes DELETE success count',
          content: {'application/json': {schema: CountSchema}},
        },
      },
    })
    async delete(
      @param.path.number('id') id: number,
      @param.query.object('where', getWhereSchemaFor(EventUserTypes)) where?: Where<EventUserTypes>,
    ): Promise<Count> {
      return this.eventRepository.eventUserTypes(id).delete(where);
    }
  }
  