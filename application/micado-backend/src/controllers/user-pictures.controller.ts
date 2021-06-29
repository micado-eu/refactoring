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
import {UserPictures} from '../models';
import {UserPicturesRepository} from '../repositories';

export class UserPicturesController {
  constructor(
    @repository(UserPicturesRepository)
    public userPicturesRepository : UserPicturesRepository,
  ) {}

  @post('/user-pictures', {
    responses: {
      '200': {
        description: 'UserPictures model instance',
        content: {'application/json': {schema: getModelSchemaRef(UserPictures)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserPictures, {
            title: 'NewUserPictures',
            exclude: ['id'],
          }),
        },
      },
    })
    userPictures: Omit<UserPictures, 'id'>,
  ): Promise<UserPictures> {
    return this.userPicturesRepository.create(userPictures);
  }

  @get('/user-pictures/count', {
    responses: {
      '200': {
        description: 'UserPictures model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(UserPictures) where?: Where<UserPictures>,
  ): Promise<Count> {
    return this.userPicturesRepository.count(where);
  }

  @get('/user-pictures', {
    responses: {
      '200': {
        description: 'Array of UserPictures model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(UserPictures, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(UserPictures) filter?: Filter<UserPictures>,
  ): Promise<UserPictures[]> {
    return this.userPicturesRepository.find(filter);
  }

  @patch('/user-pictures', {
    responses: {
      '200': {
        description: 'UserPictures PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserPictures, {partial: true}),
        },
      },
    })
    userPictures: UserPictures,
    @param.where(UserPictures) where?: Where<UserPictures>,
  ): Promise<Count> {
    return this.userPicturesRepository.updateAll(userPictures, where);
  }

  @get('/user-pictures/{id}', {
    responses: {
      '200': {
        description: 'UserPictures model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(UserPictures, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(UserPictures, {exclude: 'where'}) filter?: FilterExcludingWhere<UserPictures>
  ): Promise<UserPictures> {
    return this.userPicturesRepository.findById(id, filter);
  }

  @patch('/user-pictures/{id}', {
    responses: {
      '204': {
        description: 'UserPictures PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserPictures, {partial: true}),
        },
      },
    })
    userPictures: UserPictures,
  ): Promise<void> {
    await this.userPicturesRepository.updateById(id, userPictures);
  }

  @put('/user-pictures/{id}', {
    responses: {
      '204': {
        description: 'UserPictures PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() userPictures: UserPictures,
  ): Promise<void> {
    await this.userPicturesRepository.replaceById(id, userPictures);
  }

  @del('/user-pictures/{id}', {
    responses: {
      '204': {
        description: 'UserPictures DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.userPicturesRepository.deleteById(id);
  }
}
