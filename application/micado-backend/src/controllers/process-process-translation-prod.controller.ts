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
  Process,
  ProcessTranslationProd,
} from '../models';
import {ProcessRepository} from '../repositories';

export class ProcessProcessTranslationProdController {
  constructor(
    @repository(ProcessRepository) protected processRepository: ProcessRepository,
  ) { }

  @get('/processes/{id}/process-translation-prods', {
    responses: {
      '200': {
        description: 'Array of Process has many ProcessTranslationProd',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ProcessTranslationProd)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ProcessTranslationProd>,
  ): Promise<ProcessTranslationProd[]> {
    return this.processRepository.translations_prod(id).find(filter);
  }

  @post('/processes/{id}/process-translation-prods', {
    responses: {
      '200': {
        description: 'Process model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProcessTranslationProd)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Process.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProcessTranslationProd, {
            title: 'NewProcessTranslationProdInProcess',
            //exclude: ['id'],
            optional: ['id']
          }),
        },
      },
    }) processTranslationProd: Omit<ProcessTranslationProd, 'id'>,
  ): Promise<ProcessTranslationProd> {
    return this.processRepository.translations_prod(id).create(processTranslationProd);
  }

  @patch('/processes/{id}/process-translation-prods', {
    responses: {
      '200': {
        description: 'Process.ProcessTranslationProd PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProcessTranslationProd, {partial: true}),
        },
      },
    })
    processTranslationProd: Partial<ProcessTranslationProd>,
    @param.query.object('where', getWhereSchemaFor(ProcessTranslationProd)) where?: Where<ProcessTranslationProd>,
  ): Promise<Count> {
    return this.processRepository.translations_prod(id).patch(processTranslationProd, where);
  }

  @del('/processes/{id}/process-translation-prods', {
    responses: {
      '200': {
        description: 'Process.ProcessTranslationProd DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ProcessTranslationProd)) where?: Where<ProcessTranslationProd>,
  ): Promise<Count> {
    return this.processRepository.translations_prod(id).delete(where);
  }
}
