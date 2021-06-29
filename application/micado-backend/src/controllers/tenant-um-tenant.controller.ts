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
  Tenant,
  UmTenant,
} from '../models';
import {TenantRepository} from '../repositories';

export class TenantUmTenantController {
  constructor(
    @repository(TenantRepository) protected tenantRepository: TenantRepository,
  ) { }

  @get('/tenants/{id}/um-tenant', {
    responses: {
      '200': {
        description: 'Tenant has one UmTenant',
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
    return this.tenantRepository.tenantData(id).get(filter);
  }

  @post('/tenants/{id}/um-tenant', {
    responses: {
      '200': {
        description: 'Tenant model instance',
        content: {'application/json': {schema: getModelSchemaRef(UmTenant)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Tenant.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UmTenant, {
            title: 'NewUmTenantInTenant',
            exclude: ['umId'],
            optional: ['umId']
          }),
        },
      },
    }) umTenant: Omit<UmTenant, 'umId'>,
  ): Promise<UmTenant> {
    return this.tenantRepository.tenantData(id).create(umTenant);
  }

  @patch('/tenants/{id}/um-tenant', {
    responses: {
      '200': {
        description: 'Tenant.UmTenant PATCH success count',
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
    umTenant: Partial<UmTenant>,
    @param.query.object('where', getWhereSchemaFor(UmTenant)) where?: Where<UmTenant>,
  ): Promise<Count> {
    return this.tenantRepository.tenantData(id).patch(umTenant, where);
  }

  @del('/tenants/{id}/um-tenant', {
    responses: {
      '200': {
        description: 'Tenant.UmTenant DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(UmTenant)) where?: Where<UmTenant>,
  ): Promise<Count> {
    return this.tenantRepository.tenantData(id).delete(where);
  }
}
