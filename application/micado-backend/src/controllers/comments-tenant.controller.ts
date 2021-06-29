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
  Comments,
  Tenant,
} from '../models';
import {CommentsRepository} from '../repositories';

export class CommentsTenantController {
  constructor(
    @repository(CommentsRepository) protected commentsRepository: CommentsRepository,
  ) { }

  @get('/comments/{id}/tenant', {
    responses: {
      '200': {
        description: 'Comments has one Tenant',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Tenant),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Tenant>,
  ): Promise<Tenant> {
    return this.commentsRepository.tenant(id).get(filter);
  }

  @post('/comments/{id}/tenant', {
    responses: {
      '200': {
        description: 'Comments model instance',
        content: {'application/json': {schema: getModelSchemaRef(Tenant)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Comments.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tenant, {
            title: 'NewTenantInComments',
            exclude: ['id'],
            optional: ['id']
          }),
        },
      },
    }) tenant: Omit<Tenant, 'id'>,
  ): Promise<Tenant> {
    return this.commentsRepository.tenant(id).create(tenant);
  }

  @patch('/comments/{id}/tenant', {
    responses: {
      '200': {
        description: 'Comments.Tenant PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tenant, {partial: true}),
        },
      },
    })
    tenant: Partial<Tenant>,
    @param.query.object('where', getWhereSchemaFor(Tenant)) where?: Where<Tenant>,
  ): Promise<Count> {
    return this.commentsRepository.tenant(id).patch(tenant, where);
  }

  @del('/comments/{id}/tenant', {
    responses: {
      '200': {
        description: 'Comments.Tenant DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Tenant)) where?: Where<Tenant>,
  ): Promise<Count> {
    return this.commentsRepository.tenant(id).delete(where);
  }
}
