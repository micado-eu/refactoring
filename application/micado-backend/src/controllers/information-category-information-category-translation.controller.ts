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
  InformationCategoryTranslation,
} from '../models';
import { InformationCategoryRepository } from '../repositories';

export class InformationCategoryInformationCategoryTranslationController {
  constructor(
    @repository(InformationCategoryRepository) protected informationCategoryRepository: InformationCategoryRepository,
  ) { }

  @get('/information-categories/{id}/information-category-translations', {
    responses: {
      '200': {
        description: 'Array of InformationCategory has many InformationCategoryTranslation',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(InformationCategoryTranslation) },
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<InformationCategoryTranslation>,
  ): Promise<InformationCategoryTranslation[]> {
    return this.informationCategoryRepository.translations(id).find(filter);
  }

  @post('/information-categories/{id}/information-category-translations', {
    responses: {
      '200': {
        description: 'InformationCategory model instance',
        content: { 'application/json': { schema: getModelSchemaRef(InformationCategoryTranslation) } },
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof InformationCategory.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InformationCategoryTranslation, {
            title: 'NewInformationCategoryTranslationInInformationCategory',
            //           exclude: ['id'],
            optional: ['id']
          }),
        },
      },
    }) informationCategoryTranslation: InformationCategoryTranslation,
    //    }) informationCategoryTranslation: Omit < InformationCategoryTranslation, 'id' >,
  ): Promise<InformationCategoryTranslation> {
    return this.informationCategoryRepository.translations(id).create(informationCategoryTranslation);
  }

  @patch('/information-categories/{id}/information-category-translations', {
    responses: {
      '200': {
        description: 'InformationCategory.InformationCategoryTranslation PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InformationCategoryTranslation, { partial: true }),
        },
      },
    })
    informationCategoryTranslation: Partial<InformationCategoryTranslation>,
    @param.query.object('where', getWhereSchemaFor(InformationCategoryTranslation)) where?: Where<InformationCategoryTranslation>,
  ): Promise<Count> {
    return this.informationCategoryRepository.translations(id).patch(informationCategoryTranslation, where);
  }

  @del('/information-categories/{id}/information-category-translations', {
    responses: {
      '200': {
        description: 'InformationCategory.InformationCategoryTranslation DELETE success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(InformationCategoryTranslation)) where?: Where<InformationCategoryTranslation>,
  ): Promise<Count> {
    return this.informationCategoryRepository.translations(id).delete(where);
  }
}
