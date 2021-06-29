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
  UserTypesTranslation,
} from '../models';
import { UserTypesRepository } from '../repositories';

export class UserTypesUserTypesTranslationController {
  constructor(
    @repository(UserTypesRepository) protected userTypesRepository: UserTypesRepository,
  ) { }

  @get('/user-types/{id}/user-types-translations', {
    responses: {
      '200': {
        description: 'Array of UserTypes has many UserTypesTranslation',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(UserTypesTranslation) },
          },
        },
      },
    },
  })
  async find (
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<UserTypesTranslation>,
  ): Promise<UserTypesTranslation[]> {
    return this.userTypesRepository.translations(id).find(filter);
  }

  @post('/user-types/{id}/user-types-translations', {
    responses: {
      '200': {
        description: 'UserTypes model instance',
        content: { 'application/json': { schema: getModelSchemaRef(UserTypesTranslation) } },
      },
    },
  })
  async create (
    @param.path.number('id') id: typeof UserTypes.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserTypesTranslation, {
            title: 'NewUserTypesTranslationInUserTypes',
            //            exclude: ['id'],
            optional: ['id']
          }),
        },
      },
    }) userTypesTranslation: UserTypesTranslation,
    //   }) userTypesTranslation: Omit < UserTypesTranslation, 'id' >,
  ): Promise<UserTypesTranslation> {
    return this.userTypesRepository.translations(id).create(userTypesTranslation);
  }

  @patch('/user-types/{id}/user-types-translations', {
    responses: {
      '200': {
        description: 'UserTypes.UserTypesTranslation PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async patch (
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserTypesTranslation, { partial: true }),
        },
      },
    })
    userTypesTranslation: Partial<UserTypesTranslation>,
    @param.query.object('where', getWhereSchemaFor(UserTypesTranslation)) where?: Where<UserTypesTranslation>,
  ): Promise<Count> {
    return this.userTypesRepository.translations(id).patch(userTypesTranslation, where);
  }

  @del('/user-types/{id}/user-types-translations', {
    responses: {
      '200': {
        description: 'UserTypes.UserTypesTranslation DELETE success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async delete (
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(UserTypesTranslation)) where?: Where<UserTypesTranslation>,
  ): Promise<Count> {
    return this.userTypesRepository.translations(id).delete(where);
  }
}
