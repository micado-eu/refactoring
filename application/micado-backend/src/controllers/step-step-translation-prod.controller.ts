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
  Step,
  StepTranslationProd,
} from '../models';
import {StepRepository} from '../repositories';

export class StepStepTranslationProdController {
  constructor(
    @repository(StepRepository) protected stepRepository: StepRepository,
  ) { }

  @get('/steps/{id}/step-translation-prods', {
    responses: {
      '200': {
        description: 'Array of Step has many StepTranslationProd',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(StepTranslationProd)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<StepTranslationProd>,
  ): Promise<StepTranslationProd[]> {
    return this.stepRepository.translations_prod(id).find(filter);
  }

  @post('/steps/{id}/step-translation-prods', {
    responses: {
      '200': {
        description: 'Step model instance',
        content: {'application/json': {schema: getModelSchemaRef(StepTranslationProd)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Step.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(StepTranslationProd, {
            title: 'NewStepTranslationProdInStep',
           // exclude: ['lang'],
            optional: ['id']
          }),
        },
      },
    }) stepTranslationProd: Omit<StepTranslationProd, 'lang'>,
  ): Promise<StepTranslationProd> {
    return this.stepRepository.translations_prod(id).create(stepTranslationProd);
  }

  @patch('/steps/{id}/step-translation-prods', {
    responses: {
      '200': {
        description: 'Step.StepTranslationProd PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(StepTranslationProd, {partial: true}),
        },
      },
    })
    stepTranslationProd: Partial<StepTranslationProd>,
    @param.query.object('where', getWhereSchemaFor(StepTranslationProd)) where?: Where<StepTranslationProd>,
  ): Promise<Count> {
    return this.stepRepository.translations_prod(id).patch(stepTranslationProd, where);
  }

  @del('/steps/{id}/step-translation-prods', {
    responses: {
      '200': {
        description: 'Step.StepTranslationProd DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(StepTranslationProd)) where?: Where<StepTranslationProd>,
  ): Promise<Count> {
    return this.stepRepository.translations_prod(id).delete(where);
  }
}
