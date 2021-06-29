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
  InterventionCategory,
  InterventionCategoryTranslationProd,
} from '../models';
import {InterventionCategoryRepository} from '../repositories';

export class InterventionCategoryInterventionCategoryTranslationProdController {
  constructor(
    @repository(InterventionCategoryRepository) protected interventionCategoryRepository: InterventionCategoryRepository,
  ) { }

  @get('/intervention-categories/{id}/intervention-category-translation-prods', {
    responses: {
      '200': {
        description: 'Array of InterventionCategory has many InterventionCategoryTranslationProd',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(InterventionCategoryTranslationProd)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<InterventionCategoryTranslationProd>,
  ): Promise<InterventionCategoryTranslationProd[]> {
    return this.interventionCategoryRepository.translations_prod(id).find(filter);
  }

  @post('/intervention-categories/{id}/intervention-category-translation-prods', {
    responses: {
      '200': {
        description: 'InterventionCategory model instance',
        content: {'application/json': {schema: getModelSchemaRef(InterventionCategoryTranslationProd)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof InterventionCategory.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InterventionCategoryTranslationProd, {
            title: 'NewInterventionCategoryTranslationProdInInterventionCategory',
            //exclude: ['id'],
            optional: ['id']
          }),
        },
      },
    }) interventionCategoryTranslationProd: Omit<InterventionCategoryTranslationProd, 'id'>,
  ): Promise<InterventionCategoryTranslationProd> {
    return this.interventionCategoryRepository.translations_prod(id).create(interventionCategoryTranslationProd);
  }

  @patch('/intervention-categories/{id}/intervention-category-translation-prods', {
    responses: {
      '200': {
        description: 'InterventionCategory.InterventionCategoryTranslationProd PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InterventionCategoryTranslationProd, {partial: true}),
        },
      },
    })
    interventionCategoryTranslationProd: Partial<InterventionCategoryTranslationProd>,
    @param.query.object('where', getWhereSchemaFor(InterventionCategoryTranslationProd)) where?: Where<InterventionCategoryTranslationProd>,
  ): Promise<Count> {
    return this.interventionCategoryRepository.translations_prod(id).patch(interventionCategoryTranslationProd, where);
  }

  @del('/intervention-categories/{id}/intervention-category-translation-prods', {
    responses: {
      '200': {
        description: 'InterventionCategory.InterventionCategoryTranslationProd DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(InterventionCategoryTranslationProd)) where?: Where<InterventionCategoryTranslationProd>,
  ): Promise<Count> {
    return this.interventionCategoryRepository.translations_prod(id).delete(where);
  }
}
