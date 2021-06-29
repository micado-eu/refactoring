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
    Information,
    InformationTag,
} from '../models';
import { InformationRepository, InformationTagRepository } from '../repositories';

export class InformationInformationTagController {
    constructor(
        @repository(InformationRepository) protected informationRepository: InformationRepository,
        @repository(InformationTagRepository) protected informationTagRepository: InformationTagRepository,
    ) { }

    @get('/information/{id}/information-tags', {
        responses: {
            '200': {
                description: 'Array of Information has many InformationTag',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: getModelSchemaRef(InformationTag) },
                    },
                },
            },
        },
    })
    async find(
        @param.path.number('id') id: number,
    ): Promise<InformationTag[]> {
        return this.informationTagRepository.find({
            where: {
                informationId: id
            }
        })
    }

    @post('/information/{id}/information-tags', {
        responses: {
            '200': {
                description: 'Information model instance',
                content: { 'application/json': { schema: getModelSchemaRef(InformationTag) } },
            },
        },
    })
    async create(
        @param.path.number('id') id: typeof Information.prototype.id,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(InformationTag, {
                        title: 'NewInformationTagInInformation',
                        //           exclude: ['id'],
                        optional: ['id', 'informationId']
                    }),
                },
            },
        }) informationTag: InformationTag,
        //    }) informationTranslation: Omit < InformationTag, 'id' >,
    ): Promise<InformationTag> {
        let instance = Object.assign(informationTag, { informationId: id })
        return this.informationTagRepository.create(instance)
    }

    // @patch('/information/{id}/information-tags', {
    //     responses: {
    //         '200': {
    //             description: 'Information.InformationTag PATCH success count',
    //             content: { 'application/json': { schema: CountSchema } },
    //         },
    //     },
    // })
    // async patch(
    //     @param.path.number('id') id: number,
    //     @requestBody({
    //         content: {
    //             'application/json': {
    //                 schema: getModelSchemaRef(InformationTag, { partial: true }),
    //             },
    //         },
    //     })
    //     informationTag: Partial<InformationTag>,
    //     @param.query.object('where', getWhereSchemaFor(InformationTag)) where?: Where<InformationTag>,
    // ): Promise<Count> {
    //     return this.informationRepository.tags(id).patch(informationTag, where);
    // }

    @del('/information/{id}/information-tags', {
        responses: {
            '200': {
                description: 'Information.InformationTag DELETE success count',
                content: { 'application/json': { schema: CountSchema } },
            },
        },
    })
    async delete(
        @param.path.number('id') id: number,
        @param.query.object('where', getWhereSchemaFor(InformationTag)) where?: Where<InformationTag>,
    ): Promise<Count> {
        let tags = await this.informationTagRepository.find({
            where: {
                informationId: id
            }
        })
        let count = 0
        for (let tag of tags) {
            await this.informationTagRepository.translations(tag.id).delete()
            await this.informationTagRepository.delete(tag)
            count++
        }
        return Promise.resolve({
            count
        });
    }
}
