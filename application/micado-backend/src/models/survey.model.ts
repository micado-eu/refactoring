import {Entity, model, property, hasMany} from '@loopback/repository';
import {SurveyAnswers} from './survey-answers.model';

@model({
  settings: {idInjection: false, postgresql: {schema: 'micadoapp', table: 'survey'}}
})
export class Survey extends Entity {
  @property({
    type: 'number',
    required: false,
    generated:true,
    scale: 0,
    id: 1,
    postgresql: {columnName: 'id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  id: number;

  @property({
    type: 'string',
    postgresql: {columnName: 'survey', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  survey?: string;

  @property({
    type: 'boolean',
    postgresql: {columnName: 'active', dataType: 'boolean', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  active?: boolean;

  @property({
    type: 'date',
    postgresql: {columnName: 'activation_date', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  activationDate?: string;

  @property({
    type: 'date',
    postgresql: {columnName: 'expiry_date', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  expiryDate?: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'title', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  title?: string;

  @property({
    type: 'number',
    scale: 0,
    postgresql: {columnName: 'destination_app', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  destinationApp?: number;

  @hasMany(() => SurveyAnswers, {keyTo: 'idSurvey'})
  answers: SurveyAnswers[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //[prop: string]: any;

  constructor(data?: Partial<Survey>) {
    super(data);
  }
}

export interface SurveyRelations {
  // describe navigational properties here
}

export type SurveyWithRelations = Survey & SurveyRelations;
