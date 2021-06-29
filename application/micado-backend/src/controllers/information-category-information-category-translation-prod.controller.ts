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
  InformationCategory,
  InformationCategoryTranslationProd,
} from '../models';
import {InformationCategoryRepository} from '../repositories';

export class InformationCategoryInformationCategoryTranslationProdController {
  constructor(
    @repository(InformationCategoryRepository) protected informationCategoryRepository: InformationCategoryRepository,
  ) { }

  @get('/information-categories/{id}/information-category-translation-prods', {
    responses: {
      '200': {
        description: 'Array of InformationCategory has many InformationCategoryTranslationProd',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(InformationCategoryTranslationProd)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<InformationCategoryTranslationProd>,
  ): Promise<InformationCategoryTranslationProd[]> {
    return this.informationCategoryRepository.translations_prod(id).find(filter);
  }

  @post('/information-categories/{id}/information-category-translation-prods', {
    responses: {
      '200': {
        description: 'InformationCategory model instance',
        content: {'application/json': {schema: getModelSchemaRef(InformationCategoryTranslationProd)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof InformationCategory.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InformationCategoryTranslationProd, {
            title: 'NewInformationCategoryTranslationProdInInformationCategory',
            //exclude: ['id'],
            optional: ['id']
          }),
        },
      },
    }) informationCategoryTranslationProd: Omit<InformationCategoryTranslationProd, 'id'>,
  ): Promise<InformationCategoryTranslationProd> {
    return this.informationCategoryRepository.translations_prod(id).create(informationCategoryTranslationProd);
  }

  @patch('/information-categories/{id}/information-category-translation-prods', {
    responses: {
      '200': {
        description: 'InformationCategory.InformationCategoryTranslationProd PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InformationCategoryTranslationProd, {partial: true}),
        },
      },
    })
    informationCategoryTranslationProd: Partial<InformationCategoryTranslationProd>,
    @param.query.object('where', getWhereSchemaFor(InformationCategoryTranslationProd)) where?: Where<InformationCategoryTranslationProd>,
  ): Promise<Count> {
    return this.informationCategoryRepository.translations_prod(id).patch(informationCategoryTranslationProd, where);
  }

  @del('/information-categories/{id}/information-category-translation-prods', {
    responses: {
      '200': {
        description: 'InformationCategory.InformationCategoryTranslationProd DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(InformationCategoryTranslationProd)) where?: Where<InformationCategoryTranslationProd>,
  ): Promise<Count> {
    return this.informationCategoryRepository.translations_prod(id).delete(where);
  }
}
