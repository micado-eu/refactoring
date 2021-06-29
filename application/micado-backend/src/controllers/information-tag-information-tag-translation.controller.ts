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
    InformationTag,
    InformationTagTranslation,
} from '../models';
import { InformationTagRepository } from '../repositories';

export class InformationTagInformationTagTranslationController {
    constructor(
        @repository(InformationTagRepository) protected informationTagRepository: InformationTagRepository,
    ) { }

    @get('/information-tags/{id}/information-tag-translations', {
        responses: {
            '200': {
                description: 'Array of InformationTag has many InformationTagTranslation',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: getModelSchemaRef(InformationTagTranslation) },
                    },
                },
            },
        },
    })
    async find(
        @param.path.number('id') id: number,
        @param.query.object('filter') filter?: Filter<InformationTagTranslation>,
    ): Promise<InformationTagTranslation[]> {
        return this.informationTagRepository.translations(id).find(filter);
    }

    @post('/information-tags/{id}/information-tag-translations', {
        responses: {
            '200': {
                description: 'InformationTag model instance',
                content: { 'application/json': { schema: getModelSchemaRef(InformationTagTranslation) } },
            },
        },
    })
    async create(
        @param.path.number('id') id: typeof InformationTag.prototype.id,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(InformationTagTranslation, {
                        title: 'NewInformationTagTranslationInInformationTag',
                        //           exclude: ['id'],
                        optional: ['id']
                    }),
                },
            },
        }) informationTagTranslation: InformationTagTranslation,
        //    }) informationTagTranslation: Omit < InformationTagTranslation, 'id' >,
    ): Promise<InformationTagTranslation> {
        return this.informationTagRepository.translations(id).create(informationTagTranslation);
    }

    @patch('/information-tags/{id}/information-tag-translations', {
        responses: {
            '200': {
                description: 'InformationTag.InformationTagTranslation PATCH success count',
                content: { 'application/json': { schema: CountSchema } },
            },
        },
    })
    async patch(
        @param.path.number('id') id: number,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(InformationTagTranslation, { partial: true }),
                },
            },
        })
        informationTagTranslation: Partial<InformationTagTranslation>,
        @param.query.object('where', getWhereSchemaFor(InformationTagTranslation)) where?: Where<InformationTagTranslation>,
    ): Promise<Count> {
        return this.informationTagRepository.translations(id).patch(informationTagTranslation, where);
    }

    @del('/information-tags/{id}/information-tag-translations', {
        responses: {
            '200': {
                description: 'InformationTag.InformationTagTranslation DELETE success count',
                content: { 'application/json': { schema: CountSchema } },
            },
        },
    })
    async delete(
        @param.path.number('id') id: number,
        @param.query.object('where', getWhereSchemaFor(InformationTagTranslation)) where?: Where<InformationTagTranslation>,
    ): Promise<Count> {
        return this.informationTagRepository.translations(id).delete(where);
    }
}
