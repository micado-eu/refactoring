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
  Process,
  ProcessUsers,
} from '../models';
import {ProcessRepository} from '../repositories';

export class ProcessProcessUsersController {
  constructor(
    @repository(ProcessRepository) protected processRepository: ProcessRepository,
  ) { }

  @get('/processes/{id}/process-users', {
    responses: {
      '200': {
        description: 'Array of Process has many ProcessUsers',
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
    return this.processRepository.applicableUsers(id).find(filter);
  }

  @post('/processes/{id}/process-users', {
    responses: {
      '200': {
        description: 'Process model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProcessUsers)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Process.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProcessUsers, {
            title: 'NewProcessUsersInProcess',
//            exclude: ['idProcess'],
            optional: ['idProcess']
          }),
        },
      },
    }) processUsers: ProcessUsers,
//  }) processUsers: Omit<ProcessUsers, 'idProcess'>,
  ): Promise<ProcessUsers> {
    return this.processRepository.applicableUsers(id).create(processUsers);
  }

  @patch('/processes/{id}/process-users', {
    responses: {
      '200': {
        description: 'Process.ProcessUsers PATCH success count',
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
    return this.processRepository.applicableUsers(id).patch(processUsers, where);
  }

  @del('/processes/{id}/process-users', {
    responses: {
      '200': {
        description: 'Process.ProcessUsers DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ProcessUsers)) where?: Where<ProcessUsers>,
  ): Promise<Count> {
    return this.processRepository.applicableUsers(id).delete(where);
  }
}
