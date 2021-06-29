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
  DocumentType,
  StepDocument,
} from '../models';
import {DocumentTypeRepository} from '../repositories';

export class DocumentTypeStepDocumentController {
  constructor(
    @repository(DocumentTypeRepository) protected documentTypeRepository: DocumentTypeRepository,
  ) { }

  @get('/document-types/{id}/step-documents', {
    responses: {
      '200': {
        description: 'Array of DocumentType has many StepDocument',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(StepDocument)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<StepDocument>,
  ): Promise<StepDocument[]> {
    return this.documentTypeRepository.linkedStep(id).find(filter);
  }

  @post('/document-types/{id}/step-documents', {
    responses: {
      '200': {
        description: 'DocumentType model instance',
        content: {'application/json': {schema: getModelSchemaRef(StepDocument)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof DocumentType.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(StepDocument, {
            title: 'NewStepDocumentInDocumentType',
            exclude: ['idStep'],
            optional: ['idDocument']
          }),
        },
      },
    }) stepDocument: Omit<StepDocument, 'idStep'>,
  ): Promise<StepDocument> {
    return this.documentTypeRepository.linkedStep(id).create(stepDocument);
  }

  @patch('/document-types/{id}/step-documents', {
    responses: {
      '200': {
        description: 'DocumentType.StepDocument PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
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
    return this.documentTypeRepository.linkedStep(id).patch(stepDocument, where);
  }

  @del('/document-types/{id}/step-documents', {
    responses: {
      '200': {
        description: 'DocumentType.StepDocument DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(StepDocument)) where?: Where<StepDocument>,
  ): Promise<Count> {
    return this.documentTypeRepository.linkedStep(id).delete(where);
  }
}
