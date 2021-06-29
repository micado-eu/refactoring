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
import {TSettings} from '../models';
import {TSettingsRepository} from '../repositories';

export class TSettingsController {
  constructor(
    @repository(TSettingsRepository)
    public tSettingsRepository : TSettingsRepository,
  ) {}

  @post('/t-settings', {
    responses: {
      '200': {
        description: 'TSettings model instance',
        content: {'application/json': {schema: getModelSchemaRef(TSettings)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TSettings, {
            title: 'NewTSettings',
            exclude: ['id'],
          }),
        },
      },
    })
    tSettings: Omit<TSettings, 'id'>,
  ): Promise<TSettings> {
    return this.tSettingsRepository.create(tSettings);
  }

  @get('/t-settings/count', {
    responses: {
      '200': {
        description: 'TSettings model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(TSettings) where?: Where<TSettings>,
  ): Promise<Count> {
    return this.tSettingsRepository.count(where);
  }

  @get('/t-settings', {
    responses: {
      '200': {
        description: 'Array of TSettings model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(TSettings, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(TSettings) filter?: Filter<TSettings>,
  ): Promise<TSettings[]> {
    return this.tSettingsRepository.find(filter);
  }

  @patch('/t-settings', {
    responses: {
      '200': {
        description: 'TSettings PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TSettings, {partial: true}),
        },
      },
    })
    tSettings: TSettings,
    @param.where(TSettings) where?: Where<TSettings>,
  ): Promise<Count> {
    return this.tSettingsRepository.updateAll(tSettings, where);
  }

  @get('/t-settings/{id}', {
    responses: {
      '200': {
        description: 'TSettings model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TSettings, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TSettings, {exclude: 'where'}) filter?: FilterExcludingWhere<TSettings>
  ): Promise<TSettings> {
    return this.tSettingsRepository.findById(id, filter);
  }

  @patch('/t-settings/{id}', {
    responses: {
      '204': {
        description: 'TSettings PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TSettings, {partial: true}),
        },
      },
    })
    tSettings: TSettings,
  ): Promise<void> {
    await this.tSettingsRepository.updateById(id, tSettings);
  }

  @put('/t-settings/{id}', {
    responses: {
      '204': {
        description: 'TSettings PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tSettings: TSettings,
  ): Promise<void> {
    await this.tSettingsRepository.replaceById(id, tSettings);
  }

  @del('/t-settings/{id}', {
    responses: {
      '204': {
        description: 'TSettings DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tSettingsRepository.deleteById(id);
  }
}
