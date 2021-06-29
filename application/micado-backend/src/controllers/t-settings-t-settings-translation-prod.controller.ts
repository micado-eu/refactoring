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
  TSettings,
  TSettingsTranslationProd,
} from '../models';
import {TSettingsRepository} from '../repositories';

export class TSettingsTSettingsTranslationProdController {
  constructor(
    @repository(TSettingsRepository) protected tSettingsRepository: TSettingsRepository,
  ) { }

  @get('/t-settings/{id}/t-settings-translation-prods', {
    responses: {
      '200': {
        description: 'Array of TSettings has many TSettingsTranslationProd',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TSettingsTranslationProd)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<TSettingsTranslationProd>,
  ): Promise<TSettingsTranslationProd[]> {
    return this.tSettingsRepository.translationProd(id).find(filter);
  }

  @post('/t-settings/{id}/t-settings-translation-prods', {
    responses: {
      '200': {
        description: 'TSettings model instance',
        content: {'application/json': {schema: getModelSchemaRef(TSettingsTranslationProd)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof TSettings.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TSettingsTranslationProd, {
            title: 'NewTSettingsTranslationProdInTSettings',
            exclude: ['id'],
            optional: ['id']
          }),
        },
      },
    }) tSettingsTranslationProd: Omit<TSettingsTranslationProd, 'id'>,
  ): Promise<TSettingsTranslationProd> {
    return this.tSettingsRepository.translationProd(id).create(tSettingsTranslationProd);
  }

  @patch('/t-settings/{id}/t-settings-translation-prods', {
    responses: {
      '200': {
        description: 'TSettings.TSettingsTranslationProd PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TSettingsTranslationProd, {partial: true}),
        },
      },
    })
    tSettingsTranslationProd: Partial<TSettingsTranslationProd>,
    @param.query.object('where', getWhereSchemaFor(TSettingsTranslationProd)) where?: Where<TSettingsTranslationProd>,
  ): Promise<Count> {
    return this.tSettingsRepository.translationProd(id).patch(tSettingsTranslationProd, where);
  }

  @del('/t-settings/{id}/t-settings-translation-prods', {
    responses: {
      '200': {
        description: 'TSettings.TSettingsTranslationProd DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(TSettingsTranslationProd)) where?: Where<TSettingsTranslationProd>,
  ): Promise<Count> {
    return this.tSettingsRepository.translationProd(id).delete(where);
  }
}
