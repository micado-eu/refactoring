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
  IndividualInterventionPlanInterventions,
  CompletedInterventionDocument,
} from '../models';
import {IndividualInterventionPlanInterventionsRepository} from '../repositories';

export class IndividualInterventionPlanInterventionsCompletedInterventionDocumentController {
  constructor(
    @repository(IndividualInterventionPlanInterventionsRepository) protected individualInterventionPlanInterventionsRepository: IndividualInterventionPlanInterventionsRepository,
  ) { }

  @get('/individual-intervention-plan-interventions/{id}/completed-intervention-document', {
    responses: {
      '200': {
        description: 'IndividualInterventionPlanInterventions has one CompletedInterventionDocument',
        content: {
          'application/json': {
            schema: getModelSchemaRef(CompletedInterventionDocument),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<CompletedInterventionDocument>,
  ): Promise<CompletedInterventionDocument> {
    return this.individualInterventionPlanInterventionsRepository.document(id).get(filter);
  }

  @post('/individual-intervention-plan-interventions/{id}/completed-intervention-document', {
    responses: {
      '200': {
        description: 'IndividualInterventionPlanInterventions model instance',
        content: {'application/json': {schema: getModelSchemaRef(CompletedInterventionDocument)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof IndividualInterventionPlanInterventions.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CompletedInterventionDocument, {
            title: 'NewCompletedInterventionDocumentInIndividualInterventionPlanInterventions',
            exclude: ['idDocument'],
            optional: ['idDocument']
          }),
        },
      },
    }) completedInterventionDocument: Omit<CompletedInterventionDocument, 'idDocument'>,
  ): Promise<CompletedInterventionDocument> {
    return this.individualInterventionPlanInterventionsRepository.document(id).create(completedInterventionDocument);
  }

  @patch('/individual-intervention-plan-interventions/{id}/completed-intervention-document', {
    responses: {
      '200': {
        description: 'IndividualInterventionPlanInterventions.CompletedInterventionDocument PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CompletedInterventionDocument, {partial: true}),
        },
      },
    })
    completedInterventionDocument: Partial<CompletedInterventionDocument>,
    @param.query.object('where', getWhereSchemaFor(CompletedInterventionDocument)) where?: Where<CompletedInterventionDocument>,
  ): Promise<Count> {
    return this.individualInterventionPlanInterventionsRepository.document(id).patch(completedInterventionDocument, where);
  }

  @del('/individual-intervention-plan-interventions/{id}/completed-intervention-document', {
    responses: {
      '200': {
        description: 'IndividualInterventionPlanInterventions.CompletedInterventionDocument DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(CompletedInterventionDocument)) where?: Where<CompletedInterventionDocument>,
  ): Promise<Count> {
    return this.individualInterventionPlanInterventionsRepository.document(id).delete(where);
  }
}
