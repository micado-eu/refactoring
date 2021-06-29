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
  ProcessTranslation,
} from '../models';
import { ProcessRepository } from '../repositories';

export class ProcessProcessTranslationController {
  constructor(
    @repository(ProcessRepository) protected processRepository: ProcessRepository,
  ) { }

  @get('/processes/{id}/process-translations', {
    responses: {
      '200': {
        description: 'Array of Process has many ProcessTranslation',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(ProcessTranslation) },
          },
        },
      },
    },
  })
  async find (
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ProcessTranslation>,
  ): Promise<ProcessTranslation[]> {
    return this.processRepository.translations(id).find(filter);
  }

  @post('/processes/{id}/process-translations', {
    responses: {
      '200': {
        description: 'Process model instance',
        content: { 'application/json': { schema: getModelSchemaRef(ProcessTranslation) } },
      },
    },
  })
  async create (
    @param.path.number('id') id: typeof Process.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProcessTranslation, {
            title: 'NewProcessTranslationInProcess',
            //           exclude: ['id'],
            optional: ['id']
          }),
        },
      },
    }) processTranslation: ProcessTranslation,
    //   }) processTranslation: Omit < ProcessTranslation, 'id' >,
  ): Promise<ProcessTranslation> {
    return this.processRepository.translations(id).create(processTranslation);
  }

  @patch('/processes/{id}/process-translations', {
    responses: {
      '200': {
        description: 'Process.ProcessTranslation PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async patch (
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProcessTranslation, { partial: true }),
        },
      },
    })
    processTranslation: Partial<ProcessTranslation>,
    @param.query.object('where', getWhereSchemaFor(ProcessTranslation)) where?: Where<ProcessTranslation>,
  ): Promise<Count> {
    return this.processRepository.translations(id).patch(processTranslation, where);
  }

  @del('/processes/{id}/process-translations', {
    responses: {
      '200': {
        description: 'Process.ProcessTranslation DELETE success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async delete (
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ProcessTranslation)) where?: Where<ProcessTranslation>,
  ): Promise<Count> {
    return this.processRepository.translations(id).delete(where);
  }
}
