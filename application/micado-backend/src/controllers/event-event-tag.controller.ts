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
    EventTag,
} from '../models';
import { EventRepository, EventTagRepository } from '../repositories';

export class EventEventTagController {
    constructor(
        @repository(EventRepository) protected eventRepository: EventRepository,
        @repository(EventTagRepository) protected eventTagRepository: EventTagRepository,
    ) { }

    @get('/events/{id}/event-tags', {
        responses: {
            '200': {
                description: 'Array of Event has many EventTag',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: getModelSchemaRef(EventTag) },
                    },
                },
            },
        },
    })
    async find(
        @param.path.number('id') id: number,
    ): Promise<EventTag[]> {
        return this.eventTagRepository.find({
            where: {
                eventId: id
            }
        })
    }

    @post('/events/{id}/event-tags', {
        responses: {
            '200': {
                description: 'Event model instance',
                content: { 'application/json': { schema: getModelSchemaRef(EventTag) } },
            },
        },
    })
    async create(
        @param.path.number('id') id: typeof Event.prototype.id,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(EventTag, {
                        title: 'NewEventTagInEvent',
                        //           exclude: ['id'],
                        optional: ['id', 'eventId']
                    }),
                },
            },
        }) eventTag: EventTag,
        //    }) eventTranslation: Omit < EventTag, 'id' >,
    ): Promise<EventTag> {
        let instance = Object.assign(eventTag, { eventId: id })
        return this.eventTagRepository.create(instance)
    }

    // @patch('/events/{id}/event-tags', {
    //     responses: {
    //         '200': {
    //             description: 'Event.EventTag PATCH success count',
    //             content: { 'application/json': { schema: CountSchema } },
    //         },
    //     },
    // })
    // async patch(
    //     @param.path.number('id') id: number,
    //     @requestBody({
    //         content: {
    //             'application/json': {
    //                 schema: getModelSchemaRef(EventTag, { partial: true }),
    //             },
    //         },
    //     })
    //     eventTag: Partial<EventTag>,
    //     @param.query.object('where', getWhereSchemaFor(EventTag)) where?: Where<EventTag>,
    // ): Promise<Count> {
    //     return this.eventRepository.tags(id).patch(eventTag, where);
    // }

    @del('/events/{id}/event-tags', {
        responses: {
            '200': {
                description: 'Event.EventTag DELETE success count',
                content: { 'application/json': { schema: CountSchema } },
            },
        },
    })
    async delete(
        @param.path.number('id') id: number,
        @param.query.object('where', getWhereSchemaFor(EventTag)) where?: Where<EventTag>,
    ): Promise<Count> {
        let tags = await this.eventTagRepository.find({
            where: {
                eventId: id
            }
        })
        let count = 0
        for (let tag of tags) {
            await this.eventTagRepository.translations(tag.id).delete()
            await this.eventTagRepository.delete(tag)
            count++
        }
        return Promise.resolve({
            count
        });
    }
}
