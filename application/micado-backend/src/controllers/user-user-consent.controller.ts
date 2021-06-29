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
  UserConsent,
} from '../models';
import {UserRepository} from '../repositories';

export class UserUserConsentController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/user-consent', {
    responses: {
      '200': {
        description: 'User has one UserConsent',
        content: {
          'application/json': {
            schema: getModelSchemaRef(UserConsent),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<UserConsent>,
  ): Promise<UserConsent> {
    return this.userRepository.userConsent(id).get(filter);
  }

  @post('/users/{id}/user-consent', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(UserConsent)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof User.prototype.umId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserConsent, {
            title: 'NewUserConsentInUser',
            exclude: ['idUser'],
            optional: ['idUser']
          }),
        },
      },
    }) userConsent: Omit<UserConsent, 'idUser'>,
  ): Promise<UserConsent> {
    return this.userRepository.userConsent(id).create(userConsent);
  }

  @patch('/users/{id}/user-consent', {
    responses: {
      '200': {
        description: 'User.UserConsent PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserConsent, {partial: true}),
        },
      },
    })
    userConsent: Partial<UserConsent>,
    @param.query.object('where', getWhereSchemaFor(UserConsent)) where?: Where<UserConsent>,
  ): Promise<Count> {
    return this.userRepository.userConsent(id).patch(userConsent, where);
  }

  @del('/users/{id}/user-consent', {
    responses: {
      '200': {
        description: 'User.UserConsent DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(UserConsent)) where?: Where<UserConsent>,
  ): Promise<Count> {
    return this.userRepository.userConsent(id).delete(where);
  }
}
