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
  UserTypes,
  ProcessUsers,
} from '../models';
import {UserTypesRepository} from '../repositories';

export class UserTypesProcessUsersController {
  constructor(
    @repository(UserTypesRepository) protected userTypesRepository: UserTypesRepository,
  ) { }

  @get('/user-types/{id}/process-users', {
    responses: {
      '200': {
        description: 'Array of UserTypes has many ProcessUsers',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ProcessUsers)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ProcessUsers>,
  ): Promise<ProcessUsers[]> {
    return this.userTypesRepository.linkedProcess(id).find(filter);
  }

  @post('/user-types/{id}/process-users', {
    responses: {
      '200': {
        description: 'UserTypes model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProcessUsers)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof UserTypes.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProcessUsers, {
            title: 'NewProcessUsersInUserTypes',
            exclude: ['idProcess'],
            optional: ['idUserTypes']
          }),
        },
      },
    }) processUsers: Omit<ProcessUsers, 'idProcess'>,
  ): Promise<ProcessUsers> {
    return this.userTypesRepository.linkedProcess(id).create(processUsers);
  }

  @patch('/user-types/{id}/process-users', {
    responses: {
      '200': {
        description: 'UserTypes.ProcessUsers PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProcessUsers, {partial: true}),
        },
      },
    })
    processUsers: Partial<ProcessUsers>,
    @param.query.object('where', getWhereSchemaFor(ProcessUsers)) where?: Where<ProcessUsers>,
  ): Promise<Count> {
    return this.userTypesRepository.linkedProcess(id).patch(processUsers, where);
  }

  @del('/user-types/{id}/process-users', {
    responses: {
      '200': {
        description: 'UserTypes.ProcessUsers DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ProcessUsers)) where?: Where<ProcessUsers>,
  ): Promise<Count> {
    return this.userTypesRepository.linkedProcess(id).delete(where);
  }
}
