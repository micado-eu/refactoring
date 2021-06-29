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
  UserTypesTranslationProd,
} from '../models';
import {UserTypesRepository} from '../repositories';

export class UserTypesUserTypesTranslationProdController {
  constructor(
    @repository(UserTypesRepository) protected userTypesRepository: UserTypesRepository,
  ) { }

  @get('/user-types/{id}/user-types-translation-prods', {
    responses: {
      '200': {
        description: 'Array of UserTypes has many UserTypesTranslationProd',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(UserTypesTranslationProd)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<UserTypesTranslationProd>,
  ): Promise<UserTypesTranslationProd[]> {
    return this.userTypesRepository.translations_prod(id).find(filter);
  }

  @post('/user-types/{id}/user-types-translation-prods', {
    responses: {
      '200': {
        description: 'UserTypes model instance',
        content: {'application/json': {schema: getModelSchemaRef(UserTypesTranslationProd)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof UserTypes.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserTypesTranslationProd, {
            title: 'NewUserTypesTranslationProdInUserTypes',
            //exclude: ['id'],
            optional: ['id']
          }),
        },
      },
    }) userTypesTranslationProd: Omit<UserTypesTranslationProd, 'id'>,
  ): Promise<UserTypesTranslationProd> {
    return this.userTypesRepository.translations_prod(id).create(userTypesTranslationProd);
  }

  @patch('/user-types/{id}/user-types-translation-prods', {
    responses: {
      '200': {
        description: 'UserTypes.UserTypesTranslationProd PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserTypesTranslationProd, {partial: true}),
        },
      },
    })
    userTypesTranslationProd: Partial<UserTypesTranslationProd>,
    @param.query.object('where', getWhereSchemaFor(UserTypesTranslationProd)) where?: Where<UserTypesTranslationProd>,
  ): Promise<Count> {
    return this.userTypesRepository.translations_prod(id).patch(userTypesTranslationProd, where);
  }

  @del('/user-types/{id}/user-types-translation-prods', {
    responses: {
      '200': {
        description: 'UserTypes.UserTypesTranslationProd DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(UserTypesTranslationProd)) where?: Where<UserTypesTranslationProd>,
  ): Promise<Count> {
    return this.userTypesRepository.translations_prod(id).delete(where);
  }
}
