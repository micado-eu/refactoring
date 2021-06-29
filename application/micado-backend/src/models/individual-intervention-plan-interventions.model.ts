import {Entity, model, property, hasOne} from '@loopback/repository';
import {IndividualInterventionPlan} from './individual-intervention-plan.model';
import {CompletedInterventionDocument} from './completed-intervention-document.model';

@model({
  settings: {
    idInjection: false,
    postgresql: {schema: 'micadoapp', table: 'individual_intervention_plan_interventions'}
  }
})
export class IndividualInterventionPlanInterventions extends Entity {
  @property({
    type: 'number',
    required: false,
    scale: 0,
    id: true,
    generated: true,
    postgresql: {columnName: 'id', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  id: number;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    postgresql: {columnName: 'list_id', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  listId: number;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    postgresql: {columnName: 'intervention_type', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  interventionType: number;

  @property({
    type: 'date',
    jsonSchema: {nullable: true},
    postgresql: {columnName: 'validation_date', dataType: 'timestamp without time zone', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  validationDate?: string;

  @property({
    type: 'boolean',
    postgresql: {columnName: 'completed', dataType: 'boolean', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  completed?: boolean;

  @property({
    type: 'number',
    scale: 0,
    jsonSchema: { nullable: true },
    postgresql: {columnName: 'validating_user_id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  validatingUserId?: number;

  @property({
    type: 'number',
    scale: 0,
    jsonSchema: { nullable: true },
    postgresql: {columnName: 'validating_user_tenant', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  validatingUserTenant?: number;

  @property({
    type: 'date',
    jsonSchema: { nullable: true },
    postgresql: {columnName: 'assignment_date', dataType: 'timestamp without time zone', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  assignmentDate?: string;

  @property({
    type: 'date',
    jsonSchema: { nullable: true },
    postgresql: {columnName: 'validationrequestdate', dataType: 'timestamp without time zone', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  validationRequestDate?: string;

  @property({
    type: 'string',
    length: 100,
    postgresql: {columnName: 'external_id', dataType: 'character varying', dataLength: 100, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  externalId?: string;

  @property({
    type: 'string',
    jsonSchema: { nullable: true },
    postgresql: { columnName: 'description', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES' },
  })
  description?: string;

  @property({
    type: 'string',
    length: 100,
    postgresql: {columnName: 'title', dataType: 'character varying', dataLength: 100, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  title?: string;

  @hasOne(() => IndividualInterventionPlan, {keyTo: 'id'})
  interventionPlan: IndividualInterventionPlan;

  @hasOne(() => CompletedInterventionDocument, {keyTo: 'idIntervention'})
  document: CompletedInterventionDocument;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //[prop: string]: any;

  constructor(data?: Partial<IndividualInterventionPlanInterventions>) {
    super(data);
  }
}

export interface IndividualInterventionPlanInterventionsRelations {
  // describe navigational properties here
}

export type IndividualInterventionPlanInterventionsWithRelations = IndividualInterventionPlanInterventions & IndividualInterventionPlanInterventionsRelations;
