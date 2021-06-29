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
    EventTagsTranslationProd,
} from '../models';
import { EventTagRepository } from '../repositories';

export class EventTagEventTagsTranslationProdController {
    constructor(
        @repository(EventTagRepository) protected eventTagRepository: EventTagRepository,
    ) { }

    @get('/event-tags/{id}/event-tag-translations-prod', {
        responses: {
            '200': {
                description: 'Array of EventTag has many EventTagsTranslationProd',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: getModelSchemaRef(EventTagsTranslationProd) },
                    },
                },
            },
        },
    })
    async find(
        @param.path.number('id') id: number,
        @param.query.object('filter') filter?: Filter<EventTagsTranslationProd>,
    ): Promise<EventTagsTranslationProd[]> {
        return this.eventTagRepository.translations_prod(id).find(filter);
    }

    @post('/event-tags/{id}/event-tag-translations-prod', {
        responses: {
            '200': {
                description: 'EventTag model instance',
                content: { 'application/json': { schema: getModelSchemaRef(EventTagsTranslationProd) } },
            },
        },
    })
    async create(
        @param.path.number('id') id: typeof EventTag.prototype.id,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(EventTagsTranslationProd, {
                        title: 'NewEventTagsTranslationProdInEventTag',
                        //           exclude: ['id'],
                        optional: ['id']
                    }),
                },
            },
        }) EventTagsTranslationProd: EventTagsTranslationProd,
        //    }) EventTagsTranslationProd: Omit < EventTagsTranslationProd, 'id' >,
    ): Promise<EventTagsTranslationProd> {
        return this.eventTagRepository.translations_prod(id).create(EventTagsTranslationProd);
    }

    @patch('/event-tags/{id}/event-tag-translations-prod', {
        responses: {
            '200': {
                description: 'EventTag.EventTagsTranslationProd PATCH success count',
                content: { 'application/json': { schema: CountSchema } },
            },
        },
    })
    async patch(
        @param.path.number('id') id: number,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(EventTagsTranslationProd, { partial: true }),
                },
            },
        })
        EventTagsTranslationProd: Partial<EventTagsTranslationProd>,
        @param.query.object('where', getWhereSchemaFor(EventTagsTranslationProd)) where?: Where<EventTagsTranslationProd>,
    ): Promise<Count> {
        return this.eventTagRepository.translations_prod(id).patch(EventTagsTranslationProd, where);
    }

    @del('/event-tags/{id}/event-tag-translations-prod', {
        responses: {
            '200': {
                description: 'EventTag.EventTagsTranslationProd DELETE success count',
                content: { 'application/json': { schema: CountSchema } },
            },
        },
    })
    async delete(
        @param.path.number('id') id: number,
        @param.query.object('where', getWhereSchemaFor(EventTagsTranslationProd)) where?: Where<EventTagsTranslationProd>,
    ): Promise<Count> {
        return this.eventTagRepository.translations_prod(id).delete(where);
    }
}
