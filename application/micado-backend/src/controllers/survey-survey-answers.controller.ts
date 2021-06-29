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
  Survey,
  SurveyAnswers,
} from '../models';
import {SurveyRepository} from '../repositories';

export class SurveySurveyAnswersController {
  constructor(
    @repository(SurveyRepository) protected surveyRepository: SurveyRepository,
  ) { }

  @get('/surveys/{id}/survey-answers', {
    responses: {
      '200': {
        description: 'Array of Survey has many SurveyAnswers',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(SurveyAnswers)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<SurveyAnswers>,
  ): Promise<SurveyAnswers[]> {
    return this.surveyRepository.answers(id).find(filter);
  }

  @post('/surveys/{id}/survey-answers', {
    responses: {
      '200': {
        description: 'Survey model instance',
        content: {'application/json': {schema: getModelSchemaRef(SurveyAnswers)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Survey.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SurveyAnswers, {
            title: 'NewSurveyAnswersInSurvey',
            exclude: ['idAnswer'],
            optional: ['idSurvey']
          }),
        },
      },
    }) surveyAnswers: Omit<SurveyAnswers, 'idAnswer'>,
  ): Promise<SurveyAnswers> {
    return this.surveyRepository.answers(id).create(surveyAnswers);
  }

  @patch('/surveys/{id}/survey-answers', {
    responses: {
      '200': {
        description: 'Survey.SurveyAnswers PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SurveyAnswers, {partial: true}),
        },
      },
    })
    surveyAnswers: Partial<SurveyAnswers>,
    @param.query.object('where', getWhereSchemaFor(SurveyAnswers)) where?: Where<SurveyAnswers>,
  ): Promise<Count> {
    return this.surveyRepository.answers(id).patch(surveyAnswers, where);
  }

  @del('/surveys/{id}/survey-answers', {
    responses: {
      '200': {
        description: 'Survey.SurveyAnswers DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(SurveyAnswers)) where?: Where<SurveyAnswers>,
  ): Promise<Count> {
    return this.surveyRepository.answers(id).delete(where);
  }
}
