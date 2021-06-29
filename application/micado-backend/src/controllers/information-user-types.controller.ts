import {
    Count,
    CountSchema,
    Filter,
    repository,
    Where,
  } from '@loopback/repository';
  import {
    param,
    get,
    getModelSchemaRef,
  } from '@loopback/rest';
  import {InformationUserTypes} from '../models';
  import {InformationUserTypesRepository} from '../repositories';
  
  export class InformationUserTypesController {
    constructor(
      @repository(InformationUserTypesRepository)
      public informationUserTypesRepository : InformationUserTypesRepository,
    ) {}
  
    @get('/information-user-types/count', {
      responses: {
        '200': {
          description: 'InformationUserTypes model count',
          content: {'application/json': {schema: CountSchema}},
        },
      },
    })
    async count(
      @param.where(InformationUserTypes) where?: Where<InformationUserTypes>,
    ): Promise<Count> {
      return this.informationUserTypesRepository.count(where);
    }
  
    @get('/information-user-types', {
      responses: {
        '200': {
          description: 'Array of InformationUserTypes model instances',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: getModelSchemaRef(InformationUserTypes, {includeRelations: true}),
              },
            },
          },
        },
      },
    })
    async find(
      @param.filter(InformationUserTypes) filter?: Filter<InformationUserTypes>,
    ): Promise<InformationUserTypes[]> {
      return this.informationUserTypesRepository.find(filter);
    }
  
  }
  