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
  UserAttribute,
} from '../models';
import {UserRepository} from '../repositories';

export class UserUserAttributeController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/user-attributes', {
    responses: {
      '200': {
        description: 'Array of User has many UserAttribute',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(UserAttribute)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<UserAttribute>,
  ): Promise<UserAttribute[]> {
    return this.userRepository.attributes(id).find(filter);
  }

  @post('/users/{id}/user-attributes', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(UserAttribute)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof User.prototype.umId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserAttribute, {
            title: 'NewUserAttributeInUser',
            exclude: ['umId'],
            optional: ['umId']
          }),
        },
      },
    }) userAttribute: Omit<UserAttribute, 'umId'>,
  ): Promise<UserAttribute> {
    return this.userRepository.attributes(id).create(userAttribute);
  }

  @patch('/users/{id}/user-attributes', {
    responses: {
      '200': {
        description: 'User.UserAttribute PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserAttribute, {partial: true}),
        },
      },
    })
    userAttribute: Partial<UserAttribute>,
    @param.query.object('where', getWhereSchemaFor(UserAttribute)) where?: Where<UserAttribute>,
  ): Promise<Count> {
    return this.userRepository.attributes(id).patch(userAttribute, where);
  }

  @del('/users/{id}/user-attributes', {
    responses: {
      '200': {
        description: 'User.UserAttribute DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(UserAttribute)) where?: Where<UserAttribute>,
  ): Promise<Count> {
    return this.userRepository.attributes(id).delete(where);
  }
}
