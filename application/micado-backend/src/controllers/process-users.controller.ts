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
import {ProcessUsers} from '../models';
import {ProcessUsersRepository} from '../repositories';

export class ProcessUsersController {
  constructor(
    @repository(ProcessUsersRepository)
    public processUsersRepository : ProcessUsersRepository,
  ) {}

  @post('/process-users', {
    responses: {
      '200': {
        description: 'ProcessUsers model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProcessUsers)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProcessUsers, {
            title: 'NewProcessUsers',
            
          }),
        },
      },
    })
    processUsers: ProcessUsers,
  ): Promise<ProcessUsers> {
    return this.processUsersRepository.create(processUsers);
  }

  @get('/process-users/count', {
    responses: {
      '200': {
        description: 'ProcessUsers model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(ProcessUsers) where?: Where<ProcessUsers>,
  ): Promise<Count> {
    return this.processUsersRepository.count(where);
  }

  @get('/process-users', {
    responses: {
      '200': {
        description: 'Array of ProcessUsers model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(ProcessUsers, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(ProcessUsers) filter?: Filter<ProcessUsers>,
  ): Promise<ProcessUsers[]> {
    return this.processUsersRepository.find(filter);
  }

  @patch('/process-users', {
    responses: {
      '200': {
        description: 'ProcessUsers PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProcessUsers, {partial: true}),
        },
      },
    })
    processUsers: ProcessUsers,
    @param.where(ProcessUsers) where?: Where<ProcessUsers>,
  ): Promise<Count> {
    return this.processUsersRepository.updateAll(processUsers, where);
  }

  @get('/process-users/{id}', {
    responses: {
      '200': {
        description: 'ProcessUsers model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ProcessUsers, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ProcessUsers, {exclude: 'where'}) filter?: FilterExcludingWhere<ProcessUsers>
  ): Promise<ProcessUsers> {
    return this.processUsersRepository.findById(id, filter);
  }

  @patch('/process-users/{id}', {
    responses: {
      '204': {
        description: 'ProcessUsers PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProcessUsers, {partial: true}),
        },
      },
    })
    processUsers: ProcessUsers,
  ): Promise<void> {
    await this.processUsersRepository.updateById(id, processUsers);
  }

  @put('/process-users/{id}', {
    responses: {
      '204': {
        description: 'ProcessUsers PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() processUsers: ProcessUsers,
  ): Promise<void> {
    await this.processUsersRepository.replaceById(id, processUsers);
  }

  @del('/process-users/{id}', {
    responses: {
      '204': {
        description: 'ProcessUsers DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.processUsersRepository.deleteById(id);
  }
}
