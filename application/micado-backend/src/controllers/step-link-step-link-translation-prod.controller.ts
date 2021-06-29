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
  StepLink,
  StepLinkTranslationProd,
} from '../models';
import {StepLinkRepository} from '../repositories';

export class StepLinkStepLinkTranslationProdController {
  constructor(
    @repository(StepLinkRepository) protected stepLinkRepository: StepLinkRepository,
  ) { }

  @get('/step-links/{id}/step-link-translation-prods', {
    responses: {
      '200': {
        description: 'Array of StepLink has many StepLinkTranslationProd',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(StepLinkTranslationProd)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<StepLinkTranslationProd>,
  ): Promise<StepLinkTranslationProd[]> {
    return this.stepLinkRepository.translations_prod(id).find(filter);
  }

  @post('/step-links/{id}/step-link-translation-prods', {
    responses: {
      '200': {
        description: 'StepLink model instance',
        content: {'application/json': {schema: getModelSchemaRef(StepLinkTranslationProd)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof StepLink.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(StepLinkTranslationProd, {
            title: 'NewStepLinkTranslationProdInStepLink',
           // exclude: ['lang'],
            optional: ['id']
          }),
        },
      },
    }) stepLinkTranslationProd: Omit<StepLinkTranslationProd, 'lang'>,
  ): Promise<StepLinkTranslationProd> {
    return this.stepLinkRepository.translations_prod(id).create(stepLinkTranslationProd);
  }

  @patch('/step-links/{id}/step-link-translation-prods', {
    responses: {
      '200': {
        description: 'StepLink.StepLinkTranslationProd PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(StepLinkTranslationProd, {partial: true}),
        },
      },
    })
    stepLinkTranslationProd: Partial<StepLinkTranslationProd>,
    @param.query.object('where', getWhereSchemaFor(StepLinkTranslationProd)) where?: Where<StepLinkTranslationProd>,
  ): Promise<Count> {
    return this.stepLinkRepository.translations_prod(id).patch(stepLinkTranslationProd, where);
  }

  @del('/step-links/{id}/step-link-translation-prods', {
    responses: {
      '200': {
        description: 'StepLink.StepLinkTranslationProd DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(StepLinkTranslationProd)) where?: Where<StepLinkTranslationProd>,
  ): Promise<Count> {
    return this.stepLinkRepository.translations_prod(id).delete(where);
  }
}
