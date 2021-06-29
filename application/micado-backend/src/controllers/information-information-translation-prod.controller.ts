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
  Information,
  InformationTranslationProd,
} from '../models';
import {InformationRepository} from '../repositories';

export class InformationInformationTranslationProdController {
  constructor(
    @repository(InformationRepository) protected informationRepository: InformationRepository,
  ) { }

  @get('/information/{id}/information-translation-prods', {
    responses: {
      '200': {
        description: 'Array of Information has many InformationTranslationProd',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(InformationTranslationProd)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<InformationTranslationProd>,
  ): Promise<InformationTranslationProd[]> {
    return this.informationRepository.translations_prod(id).find(filter);
  }

  @post('/information/{id}/information-translation-prods', {
    responses: {
      '200': {
        description: 'Information model instance',
        content: {'application/json': {schema: getModelSchemaRef(InformationTranslationProd)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Information.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InformationTranslationProd, {
            title: 'NewInformationTranslationProdInInformation',
            //exclude: ['id'],
            optional: ['id']
          }),
        },
      },
    }) informationTranslationProd: Omit<InformationTranslationProd, 'id'>,
  ): Promise<InformationTranslationProd> {
    return this.informationRepository.translations_prod(id).create(informationTranslationProd);
  }

  @patch('/information/{id}/information-translation-prods', {
    responses: {
      '200': {
        description: 'Information.InformationTranslationProd PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InformationTranslationProd, {partial: true}),
        },
      },
    })
    informationTranslationProd: Partial<InformationTranslationProd>,
    @param.query.object('where', getWhereSchemaFor(InformationTranslationProd)) where?: Where<InformationTranslationProd>,
  ): Promise<Count> {
    return this.informationRepository.translations_prod(id).patch(informationTranslationProd, where);
  }

  @del('/information/{id}/information-translation-prods', {
    responses: {
      '200': {
        description: 'Information.InformationTranslationProd DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(InformationTranslationProd)) where?: Where<InformationTranslationProd>,
  ): Promise<Count> {
    return this.informationRepository.translations_prod(id).delete(where);
  }
}
