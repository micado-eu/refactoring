import { service } from '@loopback/core';
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
  GlossaryTranslation,
} from '../models';
import { GlossaryRepository } from '../repositories';
import { MarkdownConverterService } from '../services/markdown-converter.service';

export class GlossaryGlossaryTranslationController {
  constructor(
    @repository(GlossaryRepository) protected glossaryRepository: GlossaryRepository
  ) { }

  @get('/glossaries/{id}/glossary-translations', {
    responses: {
      '200': {
        description: 'Array of Glossary has many GlossaryTranslation',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(GlossaryTranslation) },
          },
        },
      },
    },
  })
  async find (
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<GlossaryTranslation>,
  ): Promise<GlossaryTranslation[]> {
    return this.glossaryRepository.translations(id).find(filter)
  }

  @post('/glossaries/{id}/glossary-translations', {
    responses: {
      '200': {
        description: 'Glossary model instance',
        content: { 'application/json': { schema: getModelSchemaRef(GlossaryTranslation) } },
      },
    },
  })
  async create (
    @param.path.number('id') id: typeof Glossary.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GlossaryTranslation, {
            title: 'NewGlossaryTranslationInGlossary',
            //           exclude: ['id'],
            optional: ['id']
          }),
        },
      },
    }) glossaryTranslation: GlossaryTranslation,
    //    }) glossaryTranslation: Omit < GlossaryTranslation, 'id' >,
  ): Promise<GlossaryTranslation> {
    return this.glossaryRepository.translations(id).create(glossaryTranslation);
  }

  @patch('/glossaries/{id}/glossary-translations', {
    responses: {
      '200': {
        description: 'Glossary.GlossaryTranslation PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async patch (
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GlossaryTranslation, { partial: true }),
        },
      },
    })
    glossaryTranslation: Partial<GlossaryTranslation>,
    @param.query.object('where', getWhereSchemaFor(GlossaryTranslation)) where?: Where<GlossaryTranslation>,
  ): Promise<Count> {
    return this.glossaryRepository.translations(id).patch(glossaryTranslation, where);
  }

  @del('/glossaries/{id}/glossary-translations', {
    responses: {
      '200': {
        description: 'Glossary.GlossaryTranslation DELETE success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async delete (
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(GlossaryTranslation)) where?: Where<GlossaryTranslation>,
  ): Promise<Count> {
    return this.glossaryRepository.translations(id).delete(where);
  }
}
