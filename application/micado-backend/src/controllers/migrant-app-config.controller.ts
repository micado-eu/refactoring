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
import {MigrantAppConfig} from '../models';
import {MigrantAppConfigRepository} from '../repositories';

export class MigrantAppConfigController {
  constructor(
    @repository(MigrantAppConfigRepository)
    public migrantAppConfigRepository : MigrantAppConfigRepository,
  ) {}

  @post('/migrant-app-configs', {
    responses: {
      '200': {
        description: 'MigrantAppConfig model instance',
        content: {'application/json': {schema: getModelSchemaRef(MigrantAppConfig)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MigrantAppConfig, {
            title: 'NewMigrantAppConfig',
            
          }),
        },
      },
    })
    migrantAppConfig: MigrantAppConfig,
  ): Promise<MigrantAppConfig> {
    return this.migrantAppConfigRepository.create(migrantAppConfig);
  }

  @get('/migrant-app-configs/count', {
    responses: {
      '200': {
        description: 'MigrantAppConfig model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(MigrantAppConfig) where?: Where<MigrantAppConfig>,
  ): Promise<Count> {
    return this.migrantAppConfigRepository.count(where);
  }

  @get('/migrant-app-configs', {
    responses: {
      '200': {
        description: 'Array of MigrantAppConfig model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(MigrantAppConfig, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(MigrantAppConfig) filter?: Filter<MigrantAppConfig>,
  ): Promise<MigrantAppConfig[]> {
    return this.migrantAppConfigRepository.find(filter);
  }

  @patch('/migrant-app-configs', {
    responses: {
      '200': {
        description: 'MigrantAppConfig PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MigrantAppConfig, {partial: true}),
        },
      },
    })
    migrantAppConfig: MigrantAppConfig,
    @param.where(MigrantAppConfig) where?: Where<MigrantAppConfig>,
  ): Promise<Count> {
    return this.migrantAppConfigRepository.updateAll(migrantAppConfig, where);
  }

  @get('/migrant-app-configs/{id}', {
    responses: {
      '200': {
        description: 'MigrantAppConfig model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(MigrantAppConfig, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(MigrantAppConfig, {exclude: 'where'}) filter?: FilterExcludingWhere<MigrantAppConfig>
  ): Promise<MigrantAppConfig> {
    return this.migrantAppConfigRepository.findById(id, filter);
  }

  @patch('/migrant-app-configs/{id}', {
    responses: {
      '204': {
        description: 'MigrantAppConfig PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MigrantAppConfig, {partial: true}),
        },
      },
    })
    migrantAppConfig: MigrantAppConfig,
  ): Promise<void> {
    await this.migrantAppConfigRepository.updateById(id, migrantAppConfig);
  }

  @put('/migrant-app-configs/{id}', {
    responses: {
      '204': {
        description: 'MigrantAppConfig PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() migrantAppConfig: MigrantAppConfig,
  ): Promise<void> {
    await this.migrantAppConfigRepository.replaceById(id, migrantAppConfig);
  }

  @del('/migrant-app-configs/{id}', {
    responses: {
      '204': {
        description: 'MigrantAppConfig DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.migrantAppConfigRepository.deleteById(id);
  }
}
