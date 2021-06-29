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
import {Charts} from '../models';
import {ChartsRepository} from '../repositories';

export class ChartsController {
  constructor(
    @repository(ChartsRepository)
    public chartsRepository : ChartsRepository,
  ) {}

  @post('/charts', {
    responses: {
      '200': {
        description: 'Charts model instance',
        content: {'application/json': {schema: getModelSchemaRef(Charts)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Charts, {
            title: 'NewCharts',
            exclude: ['id'],
          }),
        },
      },
    })
    charts: Omit<Charts, 'id'>,
  ): Promise<Charts> {
    return this.chartsRepository.create(charts);
  }

  @get('/charts/count', {
    responses: {
      '200': {
        description: 'Charts model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Charts) where?: Where<Charts>,
  ): Promise<Count> {
    return this.chartsRepository.count(where);
  }

  @get('/charts', {
    responses: {
      '200': {
        description: 'Array of Charts model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Charts, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Charts) filter?: Filter<Charts>,
  ): Promise<Charts[]> {
    return this.chartsRepository.find(filter);
  }

  @patch('/charts', {
    responses: {
      '200': {
        description: 'Charts PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Charts, {partial: true}),
        },
      },
    })
    charts: Charts,
    @param.where(Charts) where?: Where<Charts>,
  ): Promise<Count> {
    return this.chartsRepository.updateAll(charts, where);
  }

  @get('/charts/{id}', {
    responses: {
      '200': {
        description: 'Charts model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Charts, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Charts, {exclude: 'where'}) filter?: FilterExcludingWhere<Charts>
  ): Promise<Charts> {
    return this.chartsRepository.findById(id, filter);
  }

  @patch('/charts/{id}', {
    responses: {
      '204': {
        description: 'Charts PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Charts, {partial: true}),
        },
      },
    })
    charts: Charts,
  ): Promise<void> {
    await this.chartsRepository.updateById(id, charts);
  }

  @put('/charts/{id}', {
    responses: {
      '204': {
        description: 'Charts PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() charts: Charts,
  ): Promise<void> {
    await this.chartsRepository.replaceById(id, charts);
  }

  @del('/charts/{id}', {
    responses: {
      '204': {
        description: 'Charts DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.chartsRepository.deleteById(id);
  }
}
