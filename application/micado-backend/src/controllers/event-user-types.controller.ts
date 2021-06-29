import {
    Count,
    CountSchema,
    Filter,
    repository,
    Where,
  } from '@loopback/repository';
  import {
    param,
    get,
    getModelSchemaRef,
  } from '@loopback/rest';
  import {EventUserTypes} from '../models';
  import {EventUserTypesRepository} from '../repositories';
  
  export class EventUserTypesController {
    constructor(
      @repository(EventUserTypesRepository)
      public eventUserTypesRepository : EventUserTypesRepository,
    ) {}
  
    @get('/event-user-types/count', {
      responses: {
        '200': {
          description: 'EventUserTypes model count',
          content: {'application/json': {schema: CountSchema}},
        },
      },
    })
    async count(
      @param.where(EventUserTypes) where?: Where<EventUserTypes>,
    ): Promise<Count> {
      return this.eventUserTypesRepository.count(where);
    }
  
    @get('/event-user-types', {
      responses: {
        '200': {
          description: 'Array of EventUserTypes model instances',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: getModelSchemaRef(EventUserTypes, {includeRelations: true}),
              },
            },
          },
        },
      },
    })
    async find(
      @param.filter(EventUserTypes) filter?: Filter<EventUserTypes>,
    ): Promise<EventUserTypes[]> {
      return this.eventUserTypesRepository.find(filter);
    }
  
  }
  