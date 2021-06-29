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
  User,
  UmTenant,
} from '../models';
import {UserRepository} from '../repositories';

export class UserTenantController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/um_tenant', {
    responses: {
      '200': {
        description: 'User has one Tenant',
        content: {
          'application/json': {
            schema: getModelSchemaRef(UmTenant),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<UmTenant>,
  ): Promise<UmTenant> {
    return this.userRepository.tenant(id).get(filter);
  }

  @post('/users/{id}/um_tenant', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(UmTenant)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof User.prototype.umId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UmTenant, {
            title: 'NewTenantInUser',
            exclude: ['umId'],
            optional: ['umId']
          }),
        },
      },
    }) tenant: Omit<UmTenant, 'umId'>,
  ): Promise<UmTenant> {
    return this.userRepository.tenant(id).create(tenant);
  }

  @patch('/users/{id}/um_tenant', {
    responses: {
      '200': {
        description: 'User.Tenant PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UmTenant, {partial: true}),
        },
      },
    })
    tenant: Partial<UmTenant>,
    @param.query.object('where', getWhereSchemaFor(UmTenant)) where?: Where<UmTenant>,
  ): Promise<Count> {
    return this.userRepository.tenant(id).patch(tenant, where);
  }

  @del('/users/{id}/um_tenant', {
    responses: {
      '200': {
        description: 'User.Tenant DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(UmTenant)) where?: Where<UmTenant>,
  ): Promise<Count> {
    return this.userRepository.tenant(id).delete(where);
  }
}
