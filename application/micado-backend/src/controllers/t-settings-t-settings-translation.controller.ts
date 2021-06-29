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
  TSettingsTranslation,
} from '../models';
import {TSettingsRepository} from '../repositories';

export class TSettingsTSettingsTranslationController {
  constructor(
    @repository(TSettingsRepository) protected tSettingsRepository: TSettingsRepository,
  ) { }

  @get('/t-settings/{id}/t-settings-translations', {
    responses: {
      '200': {
        description: 'Array of TSettings has many TSettingsTranslation',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TSettingsTranslation)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<TSettingsTranslation>,
  ): Promise<TSettingsTranslation[]> {
    return this.tSettingsRepository.translations(id).find(filter);
  }

  @post('/t-settings/{id}/t-settings-translations', {
    responses: {
      '200': {
        description: 'TSettings model instance',
        content: {'application/json': {schema: getModelSchemaRef(TSettingsTranslation)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof TSettings.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TSettingsTranslation, {
            title: 'NewTSettingsTranslationInTSettings',
            //exclude: ['id'],
            optional: ['id']
          }),
        },
      },
    }) tSettingsTranslation: Omit<TSettingsTranslation, 'id'>,
  ): Promise<TSettingsTranslation> {
    return this.tSettingsRepository.translations(id).create(tSettingsTranslation);
  }

  @patch('/t-settings/{id}/t-settings-translations', {
    responses: {
      '200': {
        description: 'TSettings.TSettingsTranslation PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TSettingsTranslation, {partial: true}),
        },
      },
    })
    tSettingsTranslation: Partial<TSettingsTranslation>,
    @param.query.object('where', getWhereSchemaFor(TSettingsTranslation)) where?: Where<TSettingsTranslation>,
  ): Promise<Count> {
    return this.tSettingsRepository.translations(id).patch(tSettingsTranslation, where);
  }

  @del('/t-settings/{id}/t-settings-translations', {
    responses: {
      '200': {
        description: 'TSettings.TSettingsTranslation DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(TSettingsTranslation)) where?: Where<TSettingsTranslation>,
  ): Promise<Count> {
    return this.tSettingsRepository.translations(id).delete(where);
  }
}
