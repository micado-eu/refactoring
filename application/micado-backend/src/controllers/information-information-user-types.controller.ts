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
    Information,
    InformationUserTypes,
  } from '../models';
  import {InformationRepository} from '../repositories';
  
  export class InformationInformationUserTypesController {
    constructor(
      @repository(InformationRepository) protected informationRepository: InformationRepository,
    ) { }
  
    @get('/information/{id}/information-user-types', {
      responses: {
        '200': {
          description: 'Array of Information has many InformationUserTypes',
          content: {
            'application/json': {
              schema: {type: 'array', items: getModelSchemaRef(InformationUserTypes)},
            },
          },
        },
      },
    })
    async find(
      @param.path.number('id') id: number,
      @param.query.object('filter') filter?: Filter<InformationUserTypes>,
    ): Promise<InformationUserTypes[]> {
      return this.informationRepository.informationUserTypes(id).find(filter);
    }
  
    @post('/information/{id}/information-user-types', {
      responses: {
        '200': {
          description: 'Information model instance',
          content: {'application/json': {schema: getModelSchemaRef(InformationUserTypes)}},
        },
      },
    })
    async create(
      @param.path.number('id') id: typeof Information.prototype.id,
      @requestBody({
        content: {
          'application/json': {
            schema: getModelSchemaRef(InformationUserTypes, {
              title: 'NewInformationUserTypesInInformation',
   //           exclude: ['idInformation'],
              optional: ['idInformation']
            }),
          },
        },
      }) informationUserTypes: InformationUserTypes,
   // }) informationUserTypes: Omit<InformationUserTypes, 'idInformation'>,
    ): Promise<InformationUserTypes> {
      return this.informationRepository.informationUserTypes(id).create(informationUserTypes);
    }
  
    @patch('/information/{id}/information-user-types', {
      responses: {
        '200': {
          description: 'Information.InformationUserTypes PATCH success count',
          content: {'application/json': {schema: CountSchema}},
        },
      },
    })
    async patch(
      @param.path.number('id') id: number,
      @requestBody({
        content: {
          'application/json': {
            schema: getModelSchemaRef(InformationUserTypes, {partial: true}),
          },
        },
      })
      informationUserTypes: Partial<InformationUserTypes>,
      @param.query.object('where', getWhereSchemaFor(InformationUserTypes)) where?: Where<InformationUserTypes>,
    ): Promise<Count> {
      return this.informationRepository.informationUserTypes(id).patch(informationUserTypes, where);
    }
  
    @del('/information/{id}/information-user-types', {
      responses: {
        '200': {
          description: 'Information.InformationUserTypes DELETE success count',
          content: {'application/json': {schema: CountSchema}},
        },
      },
    })
    async delete(
      @param.path.number('id') id: number,
      @param.query.object('where', getWhereSchemaFor(InformationUserTypes)) where?: Where<InformationUserTypes>,
    ): Promise<Count> {
      return this.informationRepository.informationUserTypes(id).delete(where);
    }
  }
  