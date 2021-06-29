import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    postgresql: {schema: 'micadoapp', table: 'completed_intervention_document'}
  }
})
export class CompletedInterventionDocument extends Entity {
  @property({
    type: 'number',
    required: true,
    scale: 0,
    id: 1,
    postgresql: {columnName: 'id_document', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  idDocument: number;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    //id: 2,
    postgresql: {columnName: 'id_intervention', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  idIntervention: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //[prop: string]: any;

  constructor(data?: Partial<CompletedInterventionDocument>) {
    super(data);
  }
}

export interface CompletedInterventionDocumentRelations {
  // describe navigational properties here
}

export type CompletedInterventionDocumentWithRelations = CompletedInterventionDocument & CompletedInterventionDocumentRelations;
