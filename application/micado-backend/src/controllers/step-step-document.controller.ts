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
  StepDocument,
} from '../models';
import {StepRepository} from '../repositories';

export class StepStepDocumentController {
  constructor(
    @repository(StepRepository) protected stepRepository: StepRepository,
  ) { }

  @get('/steps/{id}/step-documents', {
    responses: {
      '200': {
        description: 'Array of Step has many StepDocument',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(StepDocument)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<StepDocument>,
  ): Promise<StepDocument[]> {
    return this.stepRepository.documents(id).find(filter);
  }

  @post('/steps/{id}/step-documents', {
    responses: {
      '200': {
        description: 'Step model instance',
        content: {'application/json': {schema: getModelSchemaRef(StepDocument)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Step.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(StepDocument, {
            title: 'NewStepDocumentInStep',
            exclude: ['idStep'],
            optional: ['idStep']
          }),
        },
      },
    }) stepDocument: Omit<StepDocument, 'idStep'>,
  ): Promise<StepDocument> {
    return this.stepRepository.documents(id).create(stepDocument);
  }

  @patch('/steps/{id}/step-documents', {
    responses: {
      '200': {
        description: 'Step.StepDocument PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(StepDocument, {partial: true}),
        },
      },
    })
    stepDocument: Partial<StepDocument>,
    @param.query.object('where', getWhereSchemaFor(StepDocument)) where?: Where<StepDocument>,
  ): Promise<Count> {
    return this.stepRepository.documents(id).patch(stepDocument, where);
  }

  @del('/steps/{id}/step-documents', {
    responses: {
      '200': {
        description: 'Step.StepDocument DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(StepDocument)) where?: Where<StepDocument>,
  ): Promise<Count> {
    return this.stepRepository.documents(id).delete(where);
  }
}
