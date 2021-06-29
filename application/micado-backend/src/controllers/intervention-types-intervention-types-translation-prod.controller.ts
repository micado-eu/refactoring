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
  InterventionTypes,
  InterventionTypesTranslationProd,
} from '../models';
import {InterventionTypesRepository} from '../repositories';

export class InterventionTypesInterventionTypesTranslationProdController {
  constructor(
    @repository(InterventionTypesRepository) protected interventionTypesRepository: InterventionTypesRepository,
  ) { }

  @get('/intervention-types/{id}/intervention-types-translation-prods', {
    responses: {
      '200': {
        description: 'Array of InterventionTypes has many InterventionTypesTranslationProd',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(InterventionTypesTranslationProd)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<InterventionTypesTranslationProd>,
  ): Promise<InterventionTypesTranslationProd[]> {
    return this.interventionTypesRepository.translations_prod(id).find(filter);
  }

  @post('/intervention-types/{id}/intervention-types-translation-prods', {
    responses: {
      '200': {
        description: 'InterventionTypes model instance',
        content: {'application/json': {schema: getModelSchemaRef(InterventionTypesTranslationProd)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof InterventionTypes.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InterventionTypesTranslationProd, {
            title: 'NewInterventionTypesTranslationProdInInterventionTypes',
            //exclude: ['id'],
            optional: ['id']
          }),
        },
      },
    }) interventionTypesTranslationProd: Omit<InterventionTypesTranslationProd, 'id'>,
  ): Promise<InterventionTypesTranslationProd> {
    return this.interventionTypesRepository.translations_prod(id).create(interventionTypesTranslationProd);
  }

  @patch('/intervention-types/{id}/intervention-types-translation-prods', {
    responses: {
      '200': {
        description: 'InterventionTypes.InterventionTypesTranslationProd PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InterventionTypesTranslationProd, {partial: true}),
        },
      },
    })
    interventionTypesTranslationProd: Partial<InterventionTypesTranslationProd>,
    @param.query.object('where', getWhereSchemaFor(InterventionTypesTranslationProd)) where?: Where<InterventionTypesTranslationProd>,
  ): Promise<Count> {
    return this.interventionTypesRepository.translations_prod(id).patch(interventionTypesTranslationProd, where);
  }

  @del('/intervention-types/{id}/intervention-types-translation-prods', {
    responses: {
      '200': {
        description: 'InterventionTypes.InterventionTypesTranslationProd DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(InterventionTypesTranslationProd)) where?: Where<InterventionTypesTranslationProd>,
  ): Promise<Count> {
    return this.interventionTypesRepository.translations_prod(id).delete(where);
  }
}
