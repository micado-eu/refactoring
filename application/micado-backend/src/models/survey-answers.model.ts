import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, postgresql: {schema: 'micadoapp', table: 'survey_answers'}}
})
export class SurveyAnswers extends Entity {
  @property({
    type: 'number',
    generated:true,
    scale: 0,
    id: 1,
    postgresql: {columnName: 'id_answer', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  idAnswer: number;

  @property({
    type: 'number',
    scale: 0,
    postgresql: {columnName: 'id_survey', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  idSurvey?: number;

  @property({
    type: 'number',
    scale: 0,
    postgresql: {columnName: 'id_user', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  idUser?: number;

  @property({
    type: 'string',
    postgresql: {columnName: 'answer', dataType: 'jsonb', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  answer?: string;

  @property({
    type: 'date',
    postgresql: {columnName: 'answer_date', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  answerDate?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //[prop: string]: any;

  constructor(data?: Partial<SurveyAnswers>) {
    super(data);
  }
}

export interface SurveyAnswersRelations {
  // describe navigational properties here
}

export type SurveyAnswersWithRelations = SurveyAnswers & SurveyAnswersRelations;
