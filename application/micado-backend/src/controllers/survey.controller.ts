import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import { Survey, SurveyAnswers } from '../models';
import { SurveyRepository, SurveyAnswersRepository } from '../repositories';


export class SurveyController {
  constructor(
    @repository(SurveyRepository)
    public surveyRepository: SurveyRepository,
    @repository(SurveyAnswersRepository)
    public surveyAnswersRepository: SurveyAnswersRepository,
  ) { }

  @post('/surveys', {
    responses: {
      '200': {
        description: 'Survey model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Survey) } },
      },
    },
  })
  async create (
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Survey, {
            title: 'NewSurvey',
            exclude: ['id'],
          }),
        },
      },
    })
    survey: Omit<Survey, 'id'>,
  ): Promise<Survey> {
    return this.surveyRepository.create(survey);
  }

  @get('/surveys/count', {
    responses: {
      '200': {
        description: 'Survey model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count (
    @param.where(Survey) where?: Where<Survey>,
  ): Promise<Count> {
    return this.surveyRepository.count(where);
  }

  @get('/surveys', {
    responses: {
      '200': {
        description: 'Array of Survey model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Survey, { includeRelations: true }),
            },
          },
        },
      },
    },
  })
  async find (
    @param.filter(Survey) filter?: Filter<Survey>,
  ): Promise<Survey[]> {
    return this.surveyRepository.find(filter);
  }

  @patch('/surveys', {
    responses: {
      '200': {
        description: 'Survey PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll (
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Survey, { partial: true }),
        },
      },
    })
    survey: Survey,
    @param.where(Survey) where?: Where<Survey>,
  ): Promise<Count> {
    return this.surveyRepository.updateAll(survey, where);
  }

  @get('/surveys/{id}', {
    responses: {
      '200': {
        description: 'Survey model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Survey, { includeRelations: true }),
          },
        },
      },
    },
  })
  async findById (
    @param.path.number('id') id: number,
    @param.filter(Survey, { exclude: 'where' }) filter?: FilterExcludingWhere<Survey>
  ): Promise<Survey> {
    return this.surveyRepository.findById(id, filter);
  }

  @patch('/surveys/{id}', {
    responses: {
      '204': {
        description: 'Survey PATCH success',
      },
    },
  })
  async updateById (
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Survey, { partial: true }),
        },
      },
    })
    survey: Survey,
  ): Promise<void> {
    await this.surveyRepository.updateById(id, survey);
  }

  @put('/surveys/{id}', {
    responses: {
      '204': {
        description: 'Survey PUT success',
      },
    },
  })
  async replaceById (
    @param.path.number('id') id: number,
    @requestBody() survey: Survey,
  ): Promise<void> {
    await this.surveyRepository.replaceById(id, survey);
  }

  @del('/surveys/{id}', {
    responses: {
      '204': {
        description: 'Survey DELETE success',
      },
    },
  })
  async deleteById (@param.path.number('id') id: number): Promise<void> {
    await this.surveyRepository.deleteById(id);
  }

  @get('/specific-survey', {
    responses: {
      '200': {
        description: 'process GET for the frontend',
      },
    },
  })
  async specificSurvey (
    @param.query.number('destinationApp') destinationApp: number,
    @param.query.number('userid') userid = 0,
  ): Promise<any> {
    let surveys = await this.surveyRepository.dataSource.execute('select * from survey where survey.active = true and survey.destination_app =' + destinationApp + ' and survey.expiry_date >= current_date')
    if (userid != 0) {
      let completed_survey = await this.surveyAnswersRepository.dataSource.execute('select * from survey_answers where  EXISTS(SELECT * from survey_answers WHERE id_user =' + userid + ')')
      console.log(completed_survey)
      if (completed_survey.length > 0) {
        console.log("This survey was already answered")
        return null
      }
      else {
        console.log("This survey was not answered")
        return surveys[0]
      }
    }
    else {
      console.log("No userid given")

      return surveys[0]
    }
  }
  @get('/survey-with-answers-count', {
    responses: {
      '200': {
        description: 'process GET for the frontend',
      },
    },
  })
  async countSurveyAnswers (
  ): Promise<any> {
    return this.surveyRepository.dataSource.execute('select id as id, survey as survey, active as active,  activation_date as "activationDate", expiry_date as "expiryDate", title as title, destination_app as "destinationApp", (select count(*) as "answerNumber" from survey_answers sa where sa.id_survey = s.id ) from survey s ')
    }

  @get('/getCsv', {
    responses: {
      '200': {
        description: 'return CSV content',
      },
    },
  })
  async getCsv (
    @param.query.number('destinationApp') destinationApp: number,
    @param.query.number('surveyid') surveyid = 0,
  ): Promise<any> {
    const { parse, transforms: { unwind, flatten } } = require('json2csv');
    let surveyanswers = await this.surveyAnswersRepository.dataSource.execute('select * from survey_answers where  id_survey=' + surveyid)
    console.log(surveyanswers)
    let answerArray: any[] = []
    surveyanswers.forEach((answer: any) => {
      console.log(answer)
      answerArray.push(answer.answer)
    });
    const fields = ['question1', 'question2', 'question3.I_found', 'question3.I_understood'];
    /*
    const opts = {
      fields,
      transforms: [unwind({ paths: ['question3'] }), flatten({ objects: false, arrays: false })],
    };
    */
    const opts = {
      transforms: [flatten({ objects: true, arrays: true })],
    };
    let csv = ''
    try {
      csv = parse(answerArray, opts);
    } catch (err) {
      console.error(err);
    }
    console.log(csv);
    console.log(typeof (csv))
    return csv
  }
}

