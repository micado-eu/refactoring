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
import {MixedIcons} from '../models';
import {MixedIconsRepository} from '../repositories';

export class MixedIconsController {
  constructor(
    @repository(MixedIconsRepository)
    public mixedIconsRepository : MixedIconsRepository,
  ) {}

  @post('/mixed-icons', {
    responses: {
      '200': {
        description: 'mixedIcon model instance',
        content: {'application/json': {schema: getModelSchemaRef(MixedIcons)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MixedIcons, {
            title: 'NewmixedIcon',
            exclude: ['id'],
          }),
        },
      },
    })
    mixedIcon: Omit<MixedIcons, 'id'>,
  ): Promise<MixedIcons> {
    return this.mixedIconsRepository.create(mixedIcon);
  }

  @get('/mixed-icons/count', {
    responses: {
      '200': {
        description: 'mixedIcon model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(MixedIcons) where?: Where<MixedIcons>,
  ): Promise<Count> {
    return this.mixedIconsRepository.count(where);
  }

  @get('/mixed-icons', {
    responses: {
      '200': {
        description: 'Array of mixedIcon model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(MixedIcons, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(MixedIcons) filter?: Filter<MixedIcons>,
  ): Promise<MixedIcons[]> {
    return this.mixedIconsRepository.find(filter);
  }

  @patch('/mixed-icons', {
    responses: {
      '200': {
        description: 'mixedIcon PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MixedIcons, {partial: true}),
        },
      },
    })
    mixedIcons: MixedIcons,
    @param.where(MixedIcons) where?: Where<MixedIcons>,
  ): Promise<Count> {
    return this.mixedIconsRepository.updateAll(mixedIcons, where);
  }

  @get('/mixed-icons/{id}', {
    responses: {
      '200': {
        description: 'mixedIcon model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(MixedIcons, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(MixedIcons, {exclude: 'where'}) filter?: FilterExcludingWhere<MixedIcons>
  ): Promise<MixedIcons> {
    return this.mixedIconsRepository.findById(id, filter);
  }

  @patch('/mixed-icons/{id}', {
    responses: {
      '204': {
        description: 'mixedIcon PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MixedIcons, {partial: true}),
        },
      },
    })
    mixedIcons: MixedIcons,
  ): Promise<void> {
    await this.mixedIconsRepository.updateById(id, mixedIcons);
  }

  @put('/mixed-icons/{id}', {
    responses: {
      '204': {
        description: 'mixedIcon PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() mixedIcons: MixedIcons,
  ): Promise<void> {
    await this.mixedIconsRepository.replaceById(id, mixedIcons);
  }

  @del('/mixed-icons/{id}', {
    responses: {
      '204': {
        description: 'mixedIcon DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.mixedIconsRepository.deleteById(id);
  }
}
