import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    postgresql: {schema: 'micadoapp', table: 'intervention_processes'}
  }
})
export class InterventionProcesses extends Entity {
  @property({
    type: 'number',
    required: true,
    scale: 0,
    postgresql: {columnName: 'intervention_type', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  interventionType: number;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    postgresql: {columnName: 'process_id', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  processId: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<InterventionProcesses>) {
    super(data);
  }
}

export interface InterventionProcessesRelations {
  // describe navigational properties here
}

export type InterventionProcessesWithRelations = InterventionProcesses & InterventionProcessesRelations;
