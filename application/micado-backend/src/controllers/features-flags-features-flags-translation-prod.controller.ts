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
  FeaturesFlags,
  FeaturesFlagsTranslationProd,
} from '../models';
import {FeaturesFlagsRepository} from '../repositories';

export class FeaturesFlagsFeaturesFlagsTranslationProdController {
  constructor(
    @repository(FeaturesFlagsRepository) protected featuresFlagsRepository: FeaturesFlagsRepository,
  ) { }

  @get('/features-flags/{id}/features-flags-translation-prods', {
    responses: {
      '200': {
        description: 'Array of FeaturesFlags has many FeaturesFlagsTranslationProd',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(FeaturesFlagsTranslationProd)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<FeaturesFlagsTranslationProd>,
  ): Promise<FeaturesFlagsTranslationProd[]> {
    return this.featuresFlagsRepository.translations_prod(id).find(filter);
  }

  @post('/features-flags/{id}/features-flags-translation-prods', {
    responses: {
      '200': {
        description: 'FeaturesFlags model instance',
        content: {'application/json': {schema: getModelSchemaRef(FeaturesFlagsTranslationProd)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof FeaturesFlags.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FeaturesFlagsTranslationProd, {
            title: 'NewFeaturesFlagsTranslationProdInFeaturesFlags',
            exclude: ['id'],
            optional: ['id']
          }),
        },
      },
    }) featuresFlagsTranslationProd: Omit<FeaturesFlagsTranslationProd, 'id'>,
  ): Promise<FeaturesFlagsTranslationProd> {
    return this.featuresFlagsRepository.translations_prod(id).create(featuresFlagsTranslationProd);
  }

  @patch('/features-flags/{id}/features-flags-translation-prods', {
    responses: {
      '200': {
        description: 'FeaturesFlags.FeaturesFlagsTranslationProd PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FeaturesFlagsTranslationProd, {partial: true}),
        },
      },
    })
    featuresFlagsTranslationProd: Partial<FeaturesFlagsTranslationProd>,
    @param.query.object('where', getWhereSchemaFor(FeaturesFlagsTranslationProd)) where?: Where<FeaturesFlagsTranslationProd>,
  ): Promise<Count> {
    return this.featuresFlagsRepository.translations_prod(id).patch(featuresFlagsTranslationProd, where);
  }

  @del('/features-flags/{id}/features-flags-translation-prods', {
    responses: {
      '200': {
        description: 'FeaturesFlags.FeaturesFlagsTranslationProd DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(FeaturesFlagsTranslationProd)) where?: Where<FeaturesFlagsTranslationProd>,
  ): Promise<Count> {
    return this.featuresFlagsRepository.translations_prod(id).delete(where);
  }
}
