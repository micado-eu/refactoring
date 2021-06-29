import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, postgresql: {schema: 'micadoapp', table: 'ratings'}}
})
export class Ratings extends Entity {
   @property({
    type: 'number',
    id: 1,
    required: false,
    generated: true,
    scale: 0,
    postgresql: {columnName: 'id', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  id: number;

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
    type: 'number',
    required: true,
    scale: 0,
    postgresql: {columnName: 'content_id', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  contentId: number;

  @property({
    type: 'number',
    scale: 0,
    postgresql: {columnName: 'content_type', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  contentType?: number;

  @property({
    type: 'number',
    scale: 0,
    postgresql: {columnName: 'value', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  value?: number;

  @property({
    type: 'date',
    jsonSchema: { nullable: true },
    postgresql: { columnName: 'date', dataType: 'timestamp without time zone', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES' },
  })
  date?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //[prop: string]: any;

  constructor(data?: Partial<Ratings>) {
    super(data);
  }
}

export interface RatingsRelations {
  // describe navigational properties here
}

export type RatingsWithRelations = Ratings & RatingsRelations;
