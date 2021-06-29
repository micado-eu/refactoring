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
import { UmTenant } from '../models';
import { UmTenantRepository } from '../repositories';

export class UmTenantController {
  constructor(
    @repository(UmTenantRepository)
    public tenantRepository: UmTenantRepository,
  ) { }

  @post('/um_tenants', {
    responses: {
      '200': {
        description: 'Tenant model instance',
        content: { 'application/json': { schema: getModelSchemaRef(UmTenant) } },
      },
    },
  })
  async create (
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UmTenant, {
            title: 'NewTenantUm',
            exclude: ['umId'],
          }),
        },
      },
    })
    tenant: Omit<UmTenant, 'umId'>,
  ): Promise<UmTenant> {
    return this.tenantRepository.create(tenant);
  }

  @get('/um_tenants/count', {
    responses: {
      '200': {
        description: 'Tenant model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count (
    @param.where(UmTenant) where?: Where<UmTenant>,
  ): Promise<Count> {
    return this.tenantRepository.count(where);
  }

  @get('/um_tenants', {
    responses: {
      '200': {
        description: 'Array of Tenant model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(UmTenant, { includeRelations: true }),
            },
          },
        },
      },
    },
  })
  async find (
    @param.filter(UmTenant) filter?: Filter<UmTenant>,
  ): Promise<UmTenant[]> {
    return this.tenantRepository.find(filter);
  }

  @patch('/um_tenants', {
    responses: {
      '200': {
        description: 'Tenant PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll (
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UmTenant, { partial: true }),
        },
      },
    })
    tenant: UmTenant,
    @param.where(UmTenant) where?: Where<UmTenant>,
  ): Promise<Count> {
    return this.tenantRepository.updateAll(tenant, where);
  }

  @get('/um_tenants/{id}', {
    responses: {
      '200': {
        description: 'Tenant model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(UmTenant, { includeRelations: true }),
          },
        },
      },
    },
  })
  async findById (
    @param.path.number('id') id: number,
    @param.filter(UmTenant, { exclude: 'where' }) filter?: FilterExcludingWhere<UmTenant>
  ): Promise<UmTenant> {
    return this.tenantRepository.findById(id, filter);
  }

  @patch('/um_tenants/{id}', {
    responses: {
      '204': {
        description: 'Tenant PATCH success',
      },
    },
  })
  async updateById (
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UmTenant, { partial: true }),
        },
      },
    })
    tenant: UmTenant,
  ): Promise<void> {
    await this.tenantRepository.updateById(id, tenant);
  }

  @put('/um_tenants/{id}', {
    responses: {
      '204': {
        description: 'Tenant PUT success',
      },
    },
  })
  async replaceById (
    @param.path.number('id') id: number,
    @requestBody() tenant: UmTenant,
  ): Promise<void> {
    await this.tenantRepository.replaceById(id, tenant);
  }

  @del('/um_tenants/{id}', {
    responses: {
      '204': {
        description: 'Tenant DELETE success',
      },
    },
  })
  async deleteById (@param.path.number('id') id: number): Promise<void> {
    await this.tenantRepository.deleteById(id);
  }
}
