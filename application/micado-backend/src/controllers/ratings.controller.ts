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
import {Ratings} from '../models';
import {RatingsRepository} from '../repositories';

export class RatingsController {
  constructor(
    @repository(RatingsRepository)
    public ratingsRepository : RatingsRepository,
  ) {}

  @post('/ratings', {
    responses: {
      '200': {
        description: 'Ratings model instance',
        content: {'application/json': {schema: getModelSchemaRef(Ratings)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ratings, {
            title: 'NewRatings',
            exclude: ['id'],
          }),
        },
      },
    })
    ratings: Omit<Ratings, 'id'>,
  ): Promise<Ratings> {
    return this.ratingsRepository.create(ratings);
  }

  @get('/ratings/count', {
    responses: {
      '200': {
        description: 'Ratings model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Ratings) where?: Where<Ratings>,
  ): Promise<Count> {
    return this.ratingsRepository.count(where);
  }

  @get('/ratings', {
    responses: {
      '200': {
        description: 'Array of Ratings model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Ratings, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Ratings) filter?: Filter<Ratings>,
  ): Promise<Ratings[]> {
    return this.ratingsRepository.find(filter);
  }

  @patch('/ratings', {
    responses: {
      '200': {
        description: 'Ratings PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ratings, {partial: true}),
        },
      },
    })
    ratings: Ratings,
    @param.where(Ratings) where?: Where<Ratings>,
  ): Promise<Count> {
    return this.ratingsRepository.updateAll(ratings, where);
  }

  @get('/ratings/{id}', {
    responses: {
      '200': {
        description: 'Ratings model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Ratings, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Ratings, {exclude: 'where'}) filter?: FilterExcludingWhere<Ratings>
  ): Promise<Ratings> {
    return this.ratingsRepository.findById(id, filter);
  }

  @patch('/ratings/{id}', {
    responses: {
      '204': {
        description: 'Ratings PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ratings, {partial: true}),
        },
      },
    })
    ratings: Ratings,
  ): Promise<void> {
    await this.ratingsRepository.updateById(id, ratings);
  }

  @put('/ratings/{id}', {
    responses: {
      '204': {
        description: 'Ratings PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() ratings: Ratings,
  ): Promise<void> {
    await this.ratingsRepository.replaceById(id, ratings);
  }

  @del('/ratings/{id}', {
    responses: {
      '204': {
        description: 'Ratings DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.ratingsRepository.deleteById(id);
  }
}
