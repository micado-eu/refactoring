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
  Glossary,
  GlossaryTranslationProd,
} from '../models';
import {GlossaryRepository} from '../repositories';

export class GlossaryGlossaryTranslationProdController {
  constructor(
    @repository(GlossaryRepository) protected glossaryRepository: GlossaryRepository,
  ) { }

  @get('/glossaries/{id}/glossary-translation-prods', {
    responses: {
      '200': {
        description: 'Array of Glossary has many GlossaryTranslationProd',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(GlossaryTranslationProd)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<GlossaryTranslationProd>,
  ): Promise<GlossaryTranslationProd[]> {
    return this.glossaryRepository.translations_prod(id).find(filter);
  }

  @post('/glossaries/{id}/glossary-translation-prods', {
    responses: {
      '200': {
        description: 'Glossary model instance',
        content: {'application/json': {schema: getModelSchemaRef(GlossaryTranslationProd)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Glossary.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GlossaryTranslationProd, {
            title: 'NewGlossaryTranslationProdInGlossary',
            //exclude: ['id'],
            optional: ['id']
          }),
        },
      },
    }) glossaryTranslationProd: Omit<GlossaryTranslationProd, 'id'>,
  ): Promise<GlossaryTranslationProd> {
    return this.glossaryRepository.translations_prod(id).create(glossaryTranslationProd);
  }

  @patch('/glossaries/{id}/glossary-translation-prods', {
    responses: {
      '200': {
        description: 'Glossary.GlossaryTranslationProd PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GlossaryTranslationProd, {partial: true}),
        },
      },
    })
    glossaryTranslationProd: Partial<GlossaryTranslationProd>,
    @param.query.object('where', getWhereSchemaFor(GlossaryTranslationProd)) where?: Where<GlossaryTranslationProd>,
  ): Promise<Count> {
    return this.glossaryRepository.translations_prod(id).patch(glossaryTranslationProd, where);
  }

  @del('/glossaries/{id}/glossary-translation-prods', {
    responses: {
      '200': {
        description: 'Glossary.GlossaryTranslationProd DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(GlossaryTranslationProd)) where?: Where<GlossaryTranslationProd>,
  ): Promise<Count> {
    return this.glossaryRepository.translations_prod(id).delete(where);
  }
}
