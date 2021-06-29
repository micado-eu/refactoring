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
import { EventTag } from '../models';
import { EventTagRepository } from '../repositories';

export class EventTagController {
    constructor(
        @repository(EventTagRepository)
        public eventTagRepository: EventTagRepository,
    ) { }

    @post('/event-tags', {
        responses: {
            '200': {
                description: 'Event Tag model instance',
                content: { 'application/json': { schema: getModelSchemaRef(EventTag) } },
            },
        },
    })
    async create(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(EventTag, {
                        title: 'NewEventTag',
                        exclude: ['id'],
                    }),
                },
            },
        })
        event: Omit<EventTag, 'id'>,
    ): Promise<EventTag> {
        return this.eventTagRepository.create(event);
    }

    @get('/event-tags/count', {
        responses: {
            '200': {
                description: 'Event Tag model count',
                content: { 'application/json': { schema: CountSchema } },
            },
        },
    })
    async count(
        @param.where(EventTag) where?: Where<EventTag>,
    ): Promise<Count> {
        return this.eventTagRepository.count(where);
    }

    @get('/event-tags', {
        responses: {
            '200': {
                description: 'Array of Event Tag model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: getModelSchemaRef(EventTag, { includeRelations: true }),
                        },
                    },
                },
            },
        },
    })
    async find(
        @param.filter(EventTag) filter?: Filter<EventTag>,
    ): Promise<EventTag[]> {
        return this.eventTagRepository.find(filter);
    }

    @patch('/event-tags', {
        responses: {
            '200': {
                description: 'Event Tag PATCH success count',
                content: { 'application/json': { schema: CountSchema } },
            },
        },
    })
    async updateAll(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(EventTag, { partial: true }),
                },
            },
        })
        event: EventTag,
        @param.where(EventTag) where?: Where<EventTag>,
    ): Promise<Count> {
        return this.eventTagRepository.updateAll(event, where);
    }

    @get('/event-tags/{id}', {
        responses: {
            '200': {
                description: 'Event Tag model instance',
                content: {
                    'application/json': {
                        schema: getModelSchemaRef(EventTag, { includeRelations: true }),
                    },
                },
            },
        },
    })
    async findById(
        @param.path.number('id') id: number,
        @param.filter(EventTag, { exclude: 'where' }) filter?: FilterExcludingWhere<EventTag>
    ): Promise<EventTag> {
        return this.eventTagRepository.findById(id, filter);
    }

    @patch('/event-tags/{id}', {
        responses: {
            '204': {
                description: 'Event Tag PATCH success',
            },
        },
    })
    async updateById(
        @param.path.number('id') id: number,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(EventTag, { partial: true }),
                },
            },
        })
        event: EventTag,
    ): Promise<void> {
        await this.eventTagRepository.updateById(id, event);
    }

    @put('/event-tags/{id}', {
        responses: {
            '204': {
                description: 'Event Tag PUT success',
            },
        },
    })
    async replaceById(
        @param.path.number('id') id: number,
        @requestBody() event: EventTag,
    ): Promise<void> {
        await this.eventTagRepository.replaceById(id, event);
    }

    @del('/event-tags/{id}', {
        responses: {
            '204': {
                description: 'Event Tag DELETE success',
            },
        },
    })
    async deleteById(@param.path.number('id') id: number): Promise<void> {
        await this.eventTagRepository.deleteById(id);
    }
}
