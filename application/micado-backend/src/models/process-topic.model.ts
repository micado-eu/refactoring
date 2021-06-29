import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, postgresql: {schema: 'micadoapp', table: 'process_topic'}}
})
export class ProcessTopic extends Entity {
  @property({
    type: 'number',
    required: true,
    scale: 0,
    id: true,
    postgresql: {columnName: 'id_process', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  idProcess: number;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    postgresql: {columnName: 'id_topic', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  idTopic: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
//  [prop: string]: any;

  constructor(data?: Partial<ProcessTopic>) {
    super(data);
  }
}

export interface ProcessTopicRelations {
  // describe navigational properties here
}

export type ProcessTopicWithRelations = ProcessTopic & ProcessTopicRelations;
