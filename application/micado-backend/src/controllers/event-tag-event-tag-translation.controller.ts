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
    EventTag,
    EventTagTranslation,
} from '../models';
import { EventTagRepository } from '../repositories';

export class EventTagEventTagTranslationController {
    constructor(
        @repository(EventTagRepository) protected eventTagRepository: EventTagRepository,
    ) { }

    @get('/event-tags/{id}/event-tag-translations', {
        responses: {
            '200': {
                description: 'Array of EventTag has many EventTagTranslation',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: getModelSchemaRef(EventTagTranslation) },
                    },
                },
            },
        },
    })
    async find(
        @param.path.number('id') id: number,
        @param.query.object('filter') filter?: Filter<EventTagTranslation>,
    ): Promise<EventTagTranslation[]> {
        return this.eventTagRepository.translations(id).find(filter);
    }

    @post('/event-tags/{id}/event-tag-translations', {
        responses: {
            '200': {
                description: 'EventTag model instance',
                content: { 'application/json': { schema: getModelSchemaRef(EventTagTranslation) } },
            },
        },
    })
    async create(
        @param.path.number('id') id: typeof EventTag.prototype.id,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(EventTagTranslation, {
                        title: 'NewEventTagTranslationInEventTag',
                        //           exclude: ['id'],
                        optional: ['id']
                    }),
                },
            },
        }) eventTagTranslation: EventTagTranslation,
        //    }) eventTagTranslation: Omit < EventTagTranslation, 'id' >,
    ): Promise<EventTagTranslation> {
        return this.eventTagRepository.translations(id).create(eventTagTranslation);
    }

    @patch('/event-tags/{id}/event-tag-translations', {
        responses: {
            '200': {
                description: 'EventTag.EventTagTranslation PATCH success count',
                content: { 'application/json': { schema: CountSchema } },
            },
        },
    })
    async patch(
        @param.path.number('id') id: number,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(EventTagTranslation, { partial: true }),
                },
            },
        })
        eventTagTranslation: Partial<EventTagTranslation>,
        @param.query.object('where', getWhereSchemaFor(EventTagTranslation)) where?: Where<EventTagTranslation>,
    ): Promise<Count> {
        return this.eventTagRepository.translations(id).patch(eventTagTranslation, where);
    }

    @del('/event-tags/{id}/event-tag-translations', {
        responses: {
            '200': {
                description: 'EventTag.EventTagTranslation DELETE success count',
                content: { 'application/json': { schema: CountSchema } },
            },
        },
    })
    async delete(
        @param.path.number('id') id: number,
        @param.query.object('where', getWhereSchemaFor(EventTagTranslation)) where?: Where<EventTagTranslation>,
    ): Promise<Count> {
        return this.eventTagRepository.translations(id).delete(where);
    }
}
