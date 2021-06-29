import {Entity, model, property, hasMany} from '@loopback/repository';
import {IndividualInterventionPlanInterventions} from './individual-intervention-plan-interventions.model';

@model({
  settings: {
    idInjection: false,
    postgresql: {schema: 'micadoapp', table: 'individual_intervention_plan'}
  }
})
export class IndividualInterventionPlan extends Entity {
  @property({
    type: 'number',
    required: false,
    scale: 0,
    id: 1,
    generated:true,
    postgresql: {columnName: 'id', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  id: number;

  @property({
    type: 'string',
    length: 100,
    postgresql: {columnName: 'title', dataType: 'character varying', dataLength: 100, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  title?: string;

  @property({
    type: 'date',
    jsonSchema: { nullable: true },
    postgresql: {columnName: 'creation_date', dataType: 'timestamp without time zone', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  creationDate?: string;

  @property({
    type: 'date',
    postgresql: {columnName: 'end_date', dataType: 'timestamp without time zone', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  endDate?: string;

  @property({
    type: 'string',
    length: 30,
    postgresql: {columnName: 'case_manager', dataType: 'character varying', dataLength: 30, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  caseManager?: string;

  @property({
    type: 'number',
    scale: 0,
    postgresql: {columnName: 'user_id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  userId?: number;

  @property({
    type: 'number',
    scale: 0,
    postgresql: {columnName: 'user_tenant', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  userTenant?: number;

  @property({
    type: 'boolean',
    required: true,
    postgresql: {columnName: 'completed', dataType: 'boolean', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  completed: boolean;

  @property({
    type: 'string',
    length: 100,
    postgresql: {columnName: 'external_id', dataType: 'character varying', dataLength: 100, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  externalId?: string;

  @hasMany(() => IndividualInterventionPlanInterventions, {keyTo: 'listId'})
  interventions: IndividualInterventionPlanInterventions[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //[prop: string]: any;

  constructor(data?: Partial<IndividualInterventionPlan>) {
    super(data);
  }
}

export interface IndividualInterventionPlanRelations {
  // describe navigational properties here
}

export type IndividualInterventionPlanWithRelations = IndividualInterventionPlan & IndividualInterventionPlanRelations;
