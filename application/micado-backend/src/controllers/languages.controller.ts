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
import { Languages } from '../models';
import { LanguagesRepository } from '../repositories';

export class LanguagesController {
  constructor(
    @repository(LanguagesRepository)
    public languagesRepository: LanguagesRepository,
  ) { }

  @post('/languages', {
    responses: {
      '200': {
        description: 'Languages model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Languages) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Languages, {
            title: 'NewLanguages',

          }),
        },
      },
    })
    languages: Languages,
  ): Promise<Languages> {
    return this.languagesRepository.create(languages);
  }

  @get('/languages/count', {
    responses: {
      '200': {
        description: 'Languages model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.where(Languages) where?: Where<Languages>,
  ): Promise<Count> {
    return this.languagesRepository.count(where);
  }

  @get('/languages', {
    responses: {
      '200': {
        description: 'Array of Languages model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Languages, { includeRelations: true }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Languages) filter?: Filter<Languages>,
  ): Promise<Languages[]> {
    return this.languagesRepository.find(filter);
  }

  @get('/languages/active', {
    responses: {
      '200': {
        description: 'Array of Active Languages model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Languages, { includeRelations: true }),
            },
          },
        },
      },
    },
  })
  async findActive(
  ): Promise<Languages[]> {
    return this.languagesRepository.findActive();
  }

  @patch('/languages', {
    responses: {
      '200': {
        description: 'Languages PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Languages, { partial: true }),
        },
      },
    })
    languages: Languages,
    @param.where(Languages) where?: Where<Languages>,
  ): Promise<Count> {
    return this.languagesRepository.updateAll(languages, where);
  }

  @get('/languages/{id}', {
    responses: {
      '200': {
        description: 'Languages model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Languages, { includeRelations: true }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Languages, { exclude: 'where' }) filter?: FilterExcludingWhere<Languages>
  ): Promise<Languages> {
    return this.languagesRepository.findById(id, filter);
  }

  @patch('/languages/{id}', {
    responses: {
      '204': {
        description: 'Languages PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Languages, { partial: true }),
        },
      },
    })
    languages: Languages,
  ): Promise<void> {
    await this.languagesRepository.updateById(id, languages);
  }

  @put('/languages/{id}', {
    responses: {
      '204': {
        description: 'Languages PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() languages: Languages,
  ): Promise<void> {
    await this.languagesRepository.replaceById(id, languages);
  }

  @del('/languages/{id}', {
    responses: {
      '204': {
        description: 'Languages DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.languagesRepository.deleteById(id);
  }

}
