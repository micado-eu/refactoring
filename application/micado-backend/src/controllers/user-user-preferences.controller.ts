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
  UserPreferences,
} from '../models';
import {UserRepository} from '../repositories';

export class UserUserPreferencesController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/user-preferences', {
    responses: {
      '200': {
        description: 'Array of User has many UserPreferences',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(UserPreferences)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<UserPreferences>,
  ): Promise<UserPreferences[]> {
    return this.userRepository.userPreferences(id).find(filter);
  }

  @post('/users/{id}/user-preferences', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(UserPreferences)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof User.prototype.umId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserPreferences, {
            title: 'NewUserPreferencesInUser',
            exclude: ['idUser'],
            optional: ['idUser']
          }),
        },
      },
    }) userPreferences: Omit<UserPreferences, 'idUser'>,
  ): Promise<UserPreferences> {
    return this.userRepository.userPreferences(id).create(userPreferences);
  }

  @patch('/users/{id}/user-preferences', {
    responses: {
      '200': {
        description: 'User.UserPreferences PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserPreferences, {partial: true}),
        },
      },
    })
    userPreferences: Partial<UserPreferences>,
    @param.query.object('where', getWhereSchemaFor(UserPreferences)) where?: Where<UserPreferences>,
  ): Promise<Count> {
    return this.userRepository.userPreferences(id).patch(userPreferences, where);
  }

  @del('/users/{id}/user-preferences', {
    responses: {
      '200': {
        description: 'User.UserPreferences DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(UserPreferences)) where?: Where<UserPreferences>,
  ): Promise<Count> {
    return this.userRepository.userPreferences(id).delete(where);
  }
}
