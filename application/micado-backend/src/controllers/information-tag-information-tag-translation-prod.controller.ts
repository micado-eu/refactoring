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
    InformationTagsTranslationProd,
} from '../models';
import { InformationTagRepository } from '../repositories';

export class InformationTagInformationTagsTranslationProdController {
    constructor(
        @repository(InformationTagRepository) protected informationTagRepository: InformationTagRepository,
    ) { }

    @get('/information-tags/{id}/information-tag-translations-prod', {
        responses: {
            '200': {
                description: 'Array of InformationTag has many InformationTagsTranslationProd',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: getModelSchemaRef(InformationTagsTranslationProd) },
                    },
                },
            },
        },
    })
    async find(
        @param.path.number('id') id: number,
        @param.query.object('filter') filter?: Filter<InformationTagsTranslationProd>,
    ): Promise<InformationTagsTranslationProd[]> {
        return this.informationTagRepository.translations_prod(id).find(filter);
    }

    @post('/information-tags/{id}/information-tag-translations-prod', {
        responses: {
            '200': {
                description: 'InformationTag model instance',
                content: { 'application/json': { schema: getModelSchemaRef(InformationTagsTranslationProd) } },
            },
        },
    })
    async create(
        @param.path.number('id') id: typeof InformationTag.prototype.id,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(InformationTagsTranslationProd, {
                        title: 'NewInformationTagsTranslationProdInInformationTag',
                        //           exclude: ['id'],
                        optional: ['id']
                    }),
                },
            },
        }) InformationTagsTranslationProd: InformationTagsTranslationProd,
        //    }) InformationTagsTranslationProd: Omit < InformationTagsTranslationProd, 'id' >,
    ): Promise<InformationTagsTranslationProd> {
        return this.informationTagRepository.translations_prod(id).create(InformationTagsTranslationProd);
    }

    @patch('/information-tags/{id}/information-tag-translations-prod', {
        responses: {
            '200': {
                description: 'InformationTag.InformationTagsTranslationProd PATCH success count',
                content: { 'application/json': { schema: CountSchema } },
            },
        },
    })
    async patch(
        @param.path.number('id') id: number,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(InformationTagsTranslationProd, { partial: true }),
                },
            },
        })
        InformationTagsTranslationProd: Partial<InformationTagsTranslationProd>,
        @param.query.object('where', getWhereSchemaFor(InformationTagsTranslationProd)) where?: Where<InformationTagsTranslationProd>,
    ): Promise<Count> {
        return this.informationTagRepository.translations_prod(id).patch(InformationTagsTranslationProd, where);
    }

    @del('/information-tags/{id}/information-tag-translations-prod', {
        responses: {
            '200': {
                description: 'InformationTag.InformationTagsTranslationProd DELETE success count',
                content: { 'application/json': { schema: CountSchema } },
            },
        },
    })
    async delete(
        @param.path.number('id') id: number,
        @param.query.object('where', getWhereSchemaFor(InformationTagsTranslationProd)) where?: Where<InformationTagsTranslationProd>,
    ): Promise<Count> {
        return this.informationTagRepository.translations_prod(id).delete(where);
    }
}
