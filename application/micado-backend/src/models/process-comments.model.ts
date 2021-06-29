import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    postgresql: {schema: 'micadoapp', table: 'process_comments'}
  }
})
export class ProcessComments extends Entity {
  @property({
    type: 'number',
    required: true,
    scale: 0,
    id: 1,
    postgresql: {columnName: 'idcomment', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  idcomment: number;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    postgresql: {columnName: 'idprocess', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  idprocess: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //[prop: string]: any;

  constructor(data?: Partial<ProcessComments>) {
    super(data);
  }
}

export interface ProcessCommentsRelations {
  // describe navigational properties here
}

export type ProcessCommentsWithRelations = ProcessComments & ProcessCommentsRelations;
