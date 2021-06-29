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
import { InformationTag } from '../models';
import { InformationTagRepository } from '../repositories';

export class InformationTagController {
    constructor(
        @repository(InformationTagRepository)
        public informationTagRepository: InformationTagRepository,
    ) { }

    @post('/information-tags', {
        responses: {
            '200': {
                description: 'Information Tag model instance',
                content: { 'application/json': { schema: getModelSchemaRef(InformationTag) } },
            },
        },
    })
    async create(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(InformationTag, {
                        title: 'NewInformationTag',
                        exclude: ['id'],
                    }),
                },
            },
        })
        information: Omit<InformationTag, 'id'>,
    ): Promise<InformationTag> {
        return this.informationTagRepository.create(information);
    }

    @get('/information-tags/count', {
        responses: {
            '200': {
                description: 'Information Tag model count',
                content: { 'application/json': { schema: CountSchema } },
            },
        },
    })
    async count(
        @param.where(InformationTag) where?: Where<InformationTag>,
    ): Promise<Count> {
        return this.informationTagRepository.count(where);
    }

    @get('/information-tags', {
        responses: {
            '200': {
                description: 'Array of Information Tag model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: getModelSchemaRef(InformationTag, { includeRelations: true }),
                        },
                    },
                },
            },
        },
    })
    async find(
        @param.filter(InformationTag) filter?: Filter<InformationTag>,
    ): Promise<InformationTag[]> {
        return this.informationTagRepository.find(filter);
    }

    @patch('/information-tags', {
        responses: {
            '200': {
                description: 'Information Tag PATCH success count',
                content: { 'application/json': { schema: CountSchema } },
            },
        },
    })
    async updateAll(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(InformationTag, { partial: true }),
                },
            },
        })
        information: InformationTag,
        @param.where(InformationTag) where?: Where<InformationTag>,
    ): Promise<Count> {
        return this.informationTagRepository.updateAll(information, where);
    }

    @get('/information-tags/{id}', {
        responses: {
            '200': {
                description: 'Information Tag model instance',
                content: {
                    'application/json': {
                        schema: getModelSchemaRef(InformationTag, { includeRelations: true }),
                    },
                },
            },
        },
    })
    async findById(
        @param.path.number('id') id: number,
        @param.filter(InformationTag, { exclude: 'where' }) filter?: FilterExcludingWhere<InformationTag>
    ): Promise<InformationTag> {
        return this.informationTagRepository.findById(id, filter);
    }

    @patch('/information-tags/{id}', {
        responses: {
            '204': {
                description: 'Information Tag PATCH success',
            },
        },
    })
    async updateById(
        @param.path.number('id') id: number,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(InformationTag, { partial: true }),
                },
            },
        })
        information: InformationTag,
    ): Promise<void> {
        await this.informationTagRepository.updateById(id, information);
    }

    @put('/information-tags/{id}', {
        responses: {
            '204': {
                description: 'Information Tag PUT success',
            },
        },
    })
    async replaceById(
        @param.path.number('id') id: number,
        @requestBody() information: InformationTag,
    ): Promise<void> {
        await this.informationTagRepository.replaceById(id, information);
    }

    @del('/information-tags/{id}', {
        responses: {
            '204': {
                description: 'Information Tag DELETE success',
            },
        },
    })
    async deleteById(@param.path.number('id') id: number): Promise<void> {
        await this.informationTagRepository.deleteById(id);
    }
}
