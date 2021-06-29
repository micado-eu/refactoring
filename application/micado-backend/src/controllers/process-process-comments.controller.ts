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
  ProcessComments,
} from '../models';
import {ProcessRepository} from '../repositories';

export class ProcessProcessCommentsController {
  constructor(
    @repository(ProcessRepository) protected processRepository: ProcessRepository,
  ) { }

  @get('/processes/{id}/process-comments', {
    responses: {
      '200': {
        description: 'Array of Process has many ProcessComments',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ProcessComments)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ProcessComments>,
  ): Promise<ProcessComments[]> {
    return this.processRepository.comments(id).find(filter);
  }

  @post('/processes/{id}/process-comments', {
    responses: {
      '200': {
        description: 'Process model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProcessComments)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Process.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProcessComments, {
            title: 'NewProcessCommentsInProcess',
            //exclude: ['idcomment'],
            optional: ['idprocess']
          }),
        },
      },
    }) processComments: ProcessComments,
  ): Promise<ProcessComments> {
    return this.processRepository.comments(id).create(processComments);
  }

  @patch('/processes/{id}/process-comments', {
    responses: {
      '200': {
        description: 'Process.ProcessComments PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProcessComments, {partial: true}),
        },
      },
    })
    processComments: Partial<ProcessComments>,
    @param.query.object('where', getWhereSchemaFor(ProcessComments)) where?: Where<ProcessComments>,
  ): Promise<Count> {
    return this.processRepository.comments(id).patch(processComments, where);
  }

  @del('/processes/{id}/process-comments', {
    responses: {
      '200': {
        description: 'Process.ProcessComments DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ProcessComments)) where?: Where<ProcessComments>,
  ): Promise<Count> {
    return this.processRepository.comments(id).delete(where);
  }
}
