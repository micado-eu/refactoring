import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, postgresql: {schema: 'micadoapp', table: 'charts'}}
})
export class Charts extends Entity {
  @property({
    type: 'number',
    required: false,
    scale: 0,
    id: true,
    generated: true,
    // postgresql: {columnName: 'id', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  id: number;

  @property({
    type: 'string',
    length: 255,
    postgresql: {columnName: 'title', dataType: 'character', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  title?: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'content', dataType: 'character varying', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  content?: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'description', dataType: 'character varying', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  description?: string;

  @property({
    type: 'string',
    length: 255,
    postgresql: {columnName: 'category', dataType: 'character', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  category?: string;

  @property({
    type: 'string',
    length: 255,
    postgresql: {columnName: 'format', dataType: 'character', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  format?: string;

  @property({
    type: 'string',
    length: 255,
    postgresql: {columnName: 'type', dataType: 'character', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  type?: string;

  @property({
    type: 'boolean',
    postgresql: {columnName: 'xistime', dataType: 'boolean', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  xistime?: boolean;

  @property({
    type: 'string',
    length: 255,
    postgresql: {columnName: 'x', dataType: 'character', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  x?: string;

  @property({
    type: 'string',
    length: 255,
    postgresql: {columnName: 'y', dataType: 'character', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  y?: string;

  @property({
    type: 'string',
    required: true,
    length: 255,
    postgresql: {columnName: 'board', dataType: 'character', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  board: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Charts>) {
    super(data);
  }
}

export interface ChartsRelations {
  // describe navigational properties here
}

export type ChartsWithRelations = Charts & ChartsRelations;
