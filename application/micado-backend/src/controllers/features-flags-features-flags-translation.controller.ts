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
  FeaturesFlagsTranslation,
} from '../models';
import {FeaturesFlagsRepository} from '../repositories';

export class FeaturesFlagsFeaturesFlagsTranslationController {
  constructor(
    @repository(FeaturesFlagsRepository) protected featuresFlagsRepository: FeaturesFlagsRepository,
  ) { }

  @get('/features-flags/{id}/features-flags-translations', {
    responses: {
      '200': {
        description: 'Array of FeaturesFlags has many FeaturesFlagsTranslation',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(FeaturesFlagsTranslation)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<FeaturesFlagsTranslation>,
  ): Promise<FeaturesFlagsTranslation[]> {
    return this.featuresFlagsRepository.translations(id).find(filter);
  }

  @post('/features-flags/{id}/features-flags-translations', {
    responses: {
      '200': {
        description: 'FeaturesFlags model instance',
        content: {'application/json': {schema: getModelSchemaRef(FeaturesFlagsTranslation)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof FeaturesFlags.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FeaturesFlagsTranslation, {
            title: 'NewFeaturesFlagsTranslationInFeaturesFlags',
            exclude: ['id'],
            optional: ['id']
          }),
        },
      },
    }) featuresFlagsTranslation: Omit<FeaturesFlagsTranslation, 'id'>,
  ): Promise<FeaturesFlagsTranslation> {
    return this.featuresFlagsRepository.translations(id).create(featuresFlagsTranslation);
  }

  @patch('/features-flags/{id}/features-flags-translations', {
    responses: {
      '200': {
        description: 'FeaturesFlags.FeaturesFlagsTranslation PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FeaturesFlagsTranslation, {partial: true}),
        },
      },
    })
    featuresFlagsTranslation: Partial<FeaturesFlagsTranslation>,
    @param.query.object('where', getWhereSchemaFor(FeaturesFlagsTranslation)) where?: Where<FeaturesFlagsTranslation>,
  ): Promise<Count> {
    return this.featuresFlagsRepository.translations(id).patch(featuresFlagsTranslation, where);
  }

  @del('/features-flags/{id}/features-flags-translations', {
    responses: {
      '200': {
        description: 'FeaturesFlags.FeaturesFlagsTranslation DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(FeaturesFlagsTranslation)) where?: Where<FeaturesFlagsTranslation>,
  ): Promise<Count> {
    return this.featuresFlagsRepository.translations(id).delete(where);
  }
}
