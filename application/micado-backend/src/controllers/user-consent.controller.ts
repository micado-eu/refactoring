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
import {UserConsent} from '../models';
import {UserConsentRepository} from '../repositories';

export class UserConsentController {
  constructor(
    @repository(UserConsentRepository)
    public userConsentRepository : UserConsentRepository,
  ) {}

  @post('/user-consents', {
    responses: {
      '200': {
        description: 'UserConsent model instance',
        content: {'application/json': {schema: getModelSchemaRef(UserConsent)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserConsent, {
            title: 'NewUserConsent',
            //exclude: ['idUser'],
          }),
        },
      },
    })
    userConsent: UserConsent,
    //userConsent: Omit<UserConsent, 'idUser'>,
  ): Promise<UserConsent> {
    return this.userConsentRepository.create(userConsent);
  }

  @get('/user-consents/count', {
    responses: {
      '200': {
        description: 'UserConsent model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(UserConsent) where?: Where<UserConsent>,
  ): Promise<Count> {
    return this.userConsentRepository.count(where);
  }

  @get('/user-consents', {
    responses: {
      '200': {
        description: 'Array of UserConsent model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(UserConsent, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(UserConsent) filter?: Filter<UserConsent>,
  ): Promise<UserConsent[]> {
    return this.userConsentRepository.find(filter);
  }

  @patch('/user-consents', {
    responses: {
      '200': {
        description: 'UserConsent PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserConsent, {partial: true}),
        },
      },
    })
    userConsent: UserConsent,
    @param.where(UserConsent) where?: Where<UserConsent>,
  ): Promise<Count> {
    return this.userConsentRepository.updateAll(userConsent, where);
  }

  @get('/user-consents/{id}', {
    responses: {
      '200': {
        description: 'UserConsent model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(UserConsent, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(UserConsent, {exclude: 'where'}) filter?: FilterExcludingWhere<UserConsent>
  ): Promise<UserConsent> {
    return this.userConsentRepository.findById(id, filter);
  }

  @patch('/user-consents/{id}', {
    responses: {
      '204': {
        description: 'UserConsent PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserConsent, {partial: true}),
        },
      },
    })
    userConsent: UserConsent,
  ): Promise<void> {
    await this.userConsentRepository.updateById(id, userConsent);
  }

  @put('/user-consents/{id}', {
    responses: {
      '204': {
        description: 'UserConsent PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() userConsent: UserConsent,
  ): Promise<void> {
    await this.userConsentRepository.replaceById(id, userConsent);
  }

  @del('/user-consents/{id}', {
    responses: {
      '204': {
        description: 'UserConsent DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.userConsentRepository.deleteById(id);
  }
}
